import { Injectable, Inject } from '@nestjs/common';
import { ProjectModel } from 'src/database/models/project.model';
import { ModelClass, raw } from 'objection';
import moment = require('moment');
import { CreateProjectDto } from './dto/create-project.dto';
import { throwError } from 'rxjs';
import { ClientsService } from '../clients/clients.service';
import { ProjectLeaderModel } from 'src/database/models/projectLeader.model';
import { ProjectMemberModel } from 'src/database/models/projectMember.model';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UserModel } from 'src/database/models/user.model';
import { BoardModel } from 'src/database/models/board.model';
import { BoardAttributeModel } from 'src/database/models/boardAttribute.model';
import { finished } from 'stream';
import { AddLeadersToProjectDto } from './dto/add-leadersToProject.dto';
import { AddMembersToProjectDto } from './dto/add-membersToProject.dto';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}
@Injectable()
export class ProjectsService {
  constructor(
    @Inject('ProjectModel') private modelClass: ModelClass<ProjectModel>,
    @Inject('ProjectLeaderModel') private leaderModelClass: ModelClass<ProjectLeaderModel>,
    @Inject('ProjectMemberModel') private memberModelClass: ModelClass<ProjectMemberModel>,
    @Inject('UserModel') private userModel: ModelClass<UserModel>,
    @Inject('BoardModel') private boardModelClass: ModelClass<BoardModel>,
    @Inject('BoardAttributeModel') private boardAttributeClass: ModelClass<BoardAttributeModel>,
    private readonly clientsSerive: ClientsService,
  ) {}

  // project list
  async findAll(currentUser): Promise<ResponseData> {
    const projects = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .withGraphFetched({
      client: {},
      leaderUsers: {},
      memberUsers: {},
      tasks: {
        board: {
          boardAttribute: {}
        },
        members: {},
      }
    });
    return {
      success: true,
      message: 'Project details fetch successfully.',
      data: projects,
    };
  }

  // find one project info by projectId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const project = await this.modelClass
      .query()
      .where({brandCode: currentUser.brandCode})  
      .findById(id)
      .withGraphFetched({
        tasks: {
          members: {},
          board: {
            boardAttribute: {}
          },
        },
        client: {},
        leaderUsers: {},
        memberUsers: {},
      });
    if (project) {
      return {
        success: true,
        message: 'Project details fetch successfully.',
        data: project,
      };
    } else {
      return {
        success: false,
        message: 'No project details found.',
        data: {},
      };
    }
  }

  // Create project before save encrypt password
  async create(payload: CreateProjectDto, currentUser): Promise<ResponseData> {
    const projectPayload = payload
    const projectFnd = await this.modelClass.query().findOne({name: projectPayload.name, brandCode: currentUser.brandCode})
    if (projectFnd) {
      return {
        success: false,
        message: 'Project Already exist.',
        data: {},
      };
    }

    if (projectPayload.clientId) {
      const clientFnd = await this.clientsSerive.findById(projectPayload.clientId,currentUser)
      if (!clientFnd.success) {
        return {
          success: false,
          message: 'Project Error: Client doesnt exist.',
          data: {},
        }
      }
    } else {
      return {
        success: false,
        message: 'Project Error: clieantId is required.',
        data: {},
      }
    }

    projectPayload['brandCode'] = currentUser.brandCode
    projectPayload['createdBy'] = currentUser.username
    const {leaders, members, ...projectParams} = projectPayload
    console.log(leaders)
    console.log(members)
    console.log(projectParams)

    var result : any
    const trx = await this.modelClass.startTransaction()

    try {
      // start operation for adding project and members and leaders with relatedQuery depending on parent
      const createdProject = await this.modelClass.query(trx).insert(projectParams)
      if (createdProject) {

        for (let member of members) {
          const memberfnd = await this.userModel.query().findOne({id: member, brandCode: currentUser.brandCode})
          if (!memberfnd) {
            return {
              success: false,
              message: 'Member Error: User ' + member + ' doesnt exist.',
              data: {},
            };
          }
          const membersParams = {memberId: member , projectId: createdProject.id, createdBy: currentUser.username}
          let finishedInsert = await this.memberModelClass.query(trx).insert(membersParams)
          if (!finishedInsert) {
            throw finishedInsert
          }
        }
        for (let leader of leaders) {
          const leaderfnd = await this.userModel.query().findOne({id: leader, brandCode: currentUser.brandCode})
          if (!leaderfnd) {
            return {
              success: false,
              message: 'Leader Error: User ' + leader + ' doesnt exist.',
              data: {},
            };
          }
          const leadersParams = {leaderId: leader , projectId: createdProject.id, createdBy: currentUser.username}
          let finishedInsert = await this.leaderModelClass.query(trx).insert(leadersParams)
          if (!finishedInsert) {
            throw finishedInsert
          }
        }

        result = await this.modelClass.query(trx).findById(createdProject.id).withGraphFetched({
          // client: {},
          // members: {},
          // leaders: {},
          // boards: {
          //   boardAttribute: {}
          // },
        })
        await trx.commit()
        return {
          success: true,
          message: 'Project created successfully.',
          data: result,
        };      
      }
    } catch(err) {
      trx.rollback();
      result = err
      return {
        success: false,
        message: `Something went wrong. Project were not inserted.`,
        data: result,
      };
    }
  }

  async update(payload: UpdateProjectDto, currentUser): Promise<ResponseData> {
    const projectPayload = payload
    const project = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(projectPayload.id);
    if (project) {
      if (projectPayload.clientId) {
        const clientFnd = await this.clientsSerive.findById(projectPayload.clientId,currentUser)
        console.log(clientFnd)
        if (!clientFnd.success) {
          return {
            success: false,
            message: 'Project Error: Client doesnt exist.',
            data: {},
          };
        }
      }

      const updatedInvoice = await this.modelClass.query()
        .update({
          name: projectPayload.name ? projectPayload.name : project.name,
          actualStartDate: projectPayload.actualStartDate ? projectPayload.actualStartDate : project.actualStartDate,
          actualdEndDate: projectPayload.actualdEndDate ? projectPayload.actualdEndDate : project.actualdEndDate,
          rate: projectPayload.rate ? projectPayload.rate : project.rate,
          rateType: projectPayload.rateType ? projectPayload.rateType : project.rateType,
          priority: projectPayload.priority ? projectPayload.priority : project.priority,
          description: projectPayload.description ? projectPayload.description : project.description,
          status: projectPayload.status ? projectPayload.status : project.status,
          deleted: projectPayload.deleted ? projectPayload.deleted : project.deleted,
          clientId: projectPayload.clientId ? projectPayload.clientId : project.clientId,
          updatedBy: currentUser.username,
        })
        .where({ id: projectPayload.id });
      return {
        success: true,
        message: 'Invoice details updated successfully.',
        data: updatedInvoice,
      };
    } else {
      return {
        success: false,
        message: 'No project found.',
        data: {},
      };
    }
  }

  async addLeaders(payload: AddLeadersToProjectDto, currentUser): Promise<ResponseData> {
    const projectPayload = payload
    console.log(payload)
    const project = await this.leaderModelClass.query()
    .where({projectId:projectPayload.id})
    .whereIn('leaderId',projectPayload.leaders)
    if (!project.length) {
      const projectFnd = await this.modelClass.query().findById(projectPayload.id)
      .findOne({brandCode: currentUser.brandCode})
      console.log(projectFnd)
      if (!projectFnd) {
        return {
          success: false,
          message: 'Project Add Leaders Error: project doesnt exist doesnt exist.',
          data: {},
        };
      }

      for (let leaderId of projectPayload.leaders) {
        const addLeader = await this.leaderModelClass.query()  
        .insert({"leaderId": leaderId, projectId: projectPayload.id});
        if (!addLeader) throwError(addLeader)
      }
      return {
        success: true,
        message: 'Leader Added on the Project successfully.',
        data: {},
      };
    } else {
      return {
        success: false,
        message: 'Leaders are already exist on this project.',
        data: {},
      };
    }
  }

  async addMembers(payload: AddMembersToProjectDto, currentUser): Promise<ResponseData> {
    const projectPayload = payload
    console.log(payload)
    const project = await this.memberModelClass.query()
    .where({projectId:projectPayload.id})
    .whereIn('memberId',projectPayload.members)
    if (!project.length) {
      const projectFnd = await this.modelClass.query().findById(projectPayload.id)
      .findOne({brandCode: currentUser.brandCode})
      console.log(projectFnd)
      if (!projectFnd) {
        return {
          success: false,
          message: 'Project Add Members Error: project doesnt exist doesnt exist.',
          data: {},
        };
      }

      for (let memberId of projectPayload.members) {
        const addMember = await this.memberModelClass.query()  
        .insert({"memberId": memberId, projectId: projectPayload.id});
        if (!addMember) throwError(addMember)
      }
      return {
        success: true,
        message: 'Member Added on the Project successfully.',
        data: {},
      };
    } else {
      return {
        success: false,
        message: 'Members are already exist on this project.',
        data: {},
      };
    }
  }

  async removeLeaders(payload: AddLeadersToProjectDto, currentUser): Promise<ResponseData> {
    const projectPayload = payload
    console.log(payload)
    const project = await this.leaderModelClass.query()
    .where({projectId:projectPayload.id})
    .whereIn('leaderId',projectPayload.leaders)
    if (project.length) {
      const projectFnd = await this.modelClass.query().findById(projectPayload.id)
      .findOne({brandCode: currentUser.brandCode})
      console.log(projectFnd)
      if (!projectFnd) {
        return {
          success: false,
          message: 'Project Remove Leaders Error: project doesnt exist doesnt exist.',
          data: {},
        };
      }

      const addLeader = await this.leaderModelClass.query()  
      .delete()
      .where({projectId: projectPayload.id})
      .whereIn('leaderId', projectPayload.leaders)
      if (!addLeader) throwError(addLeader)
      return {
        success: true,
        message: 'Leaders Deleted on the Project successfully.',
        data: {},
      };
    } else {
      return {
        success: false,
        message: 'Leaders doesnt exist on this project.',
        data: {},
      };
    }
  }

  async removeMembers(payload: AddMembersToProjectDto, currentUser): Promise<ResponseData> {
    const projectPayload = payload
    console.log(payload)
    const project = await this.memberModelClass.query()
    .where({projectId:projectPayload.id})
    .whereIn('memberId',projectPayload.members)
    if (project.length) {
      const projectFnd = await this.modelClass.query().findById(projectPayload.id)
      .findOne({brandCode: currentUser.brandCode})
      console.log(projectFnd)
      if (!projectFnd) {
        return {
          success: false,
          message: 'Project Remove Members Error: project doesnt exist doesnt exist.',
          data: {},
        };
      }

      const addMember = await this.memberModelClass.query()  
      .delete()
      .where({projectId: projectPayload.id})
      .whereIn('memberId', projectPayload.members)
      if (!addMember) throwError(addMember)
      return {
        success: true,
        message: 'Members Deleted on the Project successfully.',
        data: {},
      };
    } else {
      return {
        success: false,
        message: 'Members doesnt exist on this project.',
        data: {},
      };
    }
  }

  // Delete project
  async deleteById(projectId: number, currentUser): Promise<ResponseData> {
    const projects = await this.modelClass.query()
      .where({brandCode: currentUser.brandCode})
      .where({ id: projectId })
      .delete()
    if (projects) {
      return {
        success: true,
        message: 'Invoice deleted successfully.',
        data: projects,
      };
    } else {
      return {
        success: false,
        message: 'No project found.',
        data: {},
      };
    }
  }
}
