import { Injectable, Inject } from '@nestjs/common';
import { ProjectModel } from 'src/database/models/project.model';
import { ModelClass } from 'objection';
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
        client: {},
        leaderUsers: {},
        memberUsers: {},
          // boards: {},
        // tasks: {},
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
    projectPayload['brandCode'] = currentUser.brandCode
    projectPayload['createdBy'] = currentUser.username
    if (projectPayload.clientId) {
      const clientFnd = await this.clientsSerive.findById(projectPayload.clientId,currentUser)
      if (!clientFnd.success) {
        return {
          success: false,
          message: 'Project Error: Client doesnt exist.',
          data: {},
        };
      }
    }

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
          const membersParams = {memberId: member , projectId: createdProject.id}
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
          const leadersParams = {leaderId: leader , projectId: createdProject.id}
          let finishedInsert = await this.leaderModelClass.query(trx).insert(leadersParams)
          if (!finishedInsert) {
            throw finishedInsert
          }
        }
        const finishedPending = await this.boardModelClass.query(trx).insert({name:'Pending', description: '', brandCode: currentUser.brandCode, projectId: createdProject.id})
        await this.boardAttributeClass.query(trx).insert({color: 'yellow', position: 1, userId: currentUser.id, brandCode: currentUser.brandCode, boardId: finishedPending.id})
        const finishedInProgress = await this.boardModelClass.query(trx).insert({name:'In-Progress', description: '', brandCode: currentUser.brandCode, projectId: createdProject.id})
        await this.boardAttributeClass.query(trx).insert({color: 'blue', position: 2, userId: currentUser.id, brandCode: currentUser.brandCode, boardId: finishedInProgress.id})
        const finishedcompleted = await this.boardModelClass.query(trx).insert({name:'completed', description: '', brandCode: currentUser.brandCode, projectId: createdProject.id})
        await this.boardAttributeClass.query(trx).insert({color: 'green', position: 3, userId: currentUser.id, brandCode: currentUser.brandCode, boardId: finishedcompleted.id})

        result = await this.modelClass.query(trx).findById(createdProject.id).withGraphFetched({
          client: {},
          members: {},
          leaders: {},
          boards: {
            boardAttribute: {}
          },
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
          clientId: projectPayload.clientId ? projectPayload.clientId : project.clientId,
          status: projectPayload.status ? projectPayload.status : project.status,
          deleted: projectPayload.deleted ? projectPayload.deleted : project.deleted,
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
