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
import { AddLeadersToProjectDto } from './dto/add-leadersToProject.dto';
import { AddMembersToProjectDto } from './dto/add-membersToProject.dto';
import { ProjectAttachmentModel } from 'src/database/models/projectAttachment.model';
import { AddFileDto, FileParamDto, FileUploadService } from 'src/app/app.service';
import { AttachmentModel } from 'src/database/models/attachment.model';
import TaskMemberModel from 'src/database/models/taskMember.model';
import TaskModel from 'src/database/models/task.model';

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
    @Inject('ProjectAttachmentModel') private projectAttachmentModel: ModelClass<ProjectAttachmentModel>,
    @Inject('AttachmentModel') private attachmentModel: ModelClass<AttachmentModel>,
    @Inject('TaskMemberModel') private taskMemberModelClass: ModelClass<TaskMemberModel>,
    @Inject('TaskModel') private taskModelClass: ModelClass<TaskModel>,
    private readonly clientsSerive: ClientsService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  // project list
  async findAll(currentUser): Promise<ResponseData> {
    const assignedLeaders = await this.leaderModelClass.query().where({leaderId: currentUser.id})
    const assignedMembers = await this.memberModelClass.query().where({memberId: currentUser.id})
    const assignedTaskMembers = await this.taskMemberModelClass.query().where('memberId', currentUser.id)
    const assignedTasks = await this.taskModelClass.query().findByIds(assignedTaskMembers.map(e => e.taskId))
    const proIds = await this.modelClass.query().select('id')
    .whereIn('id',assignedLeaders.map(e => e.projectId))
    .orWhereIn('id', assignedMembers.map(e => e.projectId))
    .orWhereIn('id', assignedTasks.map(e => e.projectId))
    const projects = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .whereIn('id',proIds.map(e => e.id))
    .modifiers({
      selectMemberNameAndId(builder) {
        builder.select('name');
        builder.select('avatar')
        builder.select('users.id as userId');
      },
      selectLeaderNameAndId(builder) {
        builder.select('name');
        builder.select('avatar')
        builder.select('users.id as userId');
      },
      selectTaskMemberNameAndId(builder) {
        builder.select('name');
        builder.select('avatar')
        builder.select('users.id as userId');
      },
      selectAttachUrl(builder) {
        builder.select('attachments.id as attachId');
        builder.select('url');
      },
    })
    .withGraphFetched(
      `
        [
          client,
          memberUsers(selectMemberNameAndId),
          leaderUsers(selectLeaderNameAndId),
          tasks.[attachments(selectAttachUrl), memberUsers(selectTaskMemberNameAndId), board.[boardAttribute]],
          attachments(selectAttachUrl)
        ]
      `
    )

    return {
      success: true,
      message: 'Project details fetch successfully.',
      data: projects,
    };
  }

  // find one project info by projectId
  async findById(id: number, currentUser): Promise<ResponseData> {
    const assignedLeaders = await this.leaderModelClass.query().where({leaderId: currentUser.id, projectId: id})
    const assignedMembers = await this.memberModelClass.query().where({memberId: currentUser.id, projectId: id})
    const assignedTasks = await this.taskModelClass.query().where({projectId: id})
    const assignedTaskMembers = await this.taskMemberModelClass.query().where('memberId', currentUser.id).whereIn('taskId',assignedTasks.map(e => e.id))
    let fillTaskIds = []
    if (assignedTaskMembers.length > 0) {
      fillTaskIds = await this.taskModelClass.query().where({projectId: id}).findByIds( assignedTaskMembers.map(e => e.taskId) )
    }
    let passNext = false
    if (assignedLeaders.length > 0 || assignedMembers.length > 0 || fillTaskIds.length > 0) {
      passNext = true
    }
    const project = await this.modelClass
      .query()
      .where({brandCode: currentUser.brandCode})  
      .findById(id)
      .modifiers({
        selectMemberNameAndId(builder) {
          builder.select('name');
          builder.select('avatar');
          builder.select('users.id as userId');
        },
        selectLeaderNameAndId(builder) {
          builder.select('name');
          builder.select('avatar');
          builder.select('users.id as userId');
        },
        selectTaskMemberNameAndId(builder) {
          builder.select('name');
          builder.select('avatar');
          builder.select('users.id as userId');
        },
        selectAttachUrl(builder) {
          builder.select('attachments.id as attachId');
          builder.select('url');
        },
      })
      .withGraphFetched(
        `
          [
            client,
            memberUsers(selectMemberNameAndId),
            leaderUsers(selectLeaderNameAndId),
            tasks.[attachments(selectAttachUrl), memberUsers(selectTaskMemberNameAndId), board.[boardAttribute]],
            attachments(selectAttachUrl)
          ]
        `
      )
    if (project && passNext) {
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

        result = await this.modelClass.query(trx).findById(createdProject.id)
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
    const {members, leaders, ...projectPayload} = payload
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

      var result : any
      const trx = await this.modelClass.startTransaction()

      try {
        // start operation for updating Project and leaders and members
        const oldProjectLeaders = this.leaderModelClass.query(trx).where({projectId: projectPayload.id})
        const oldProjectMembers = this.memberModelClass.query(trx).where({projectId: projectPayload.id})
        const deletedLeaders = await oldProjectLeaders.delete()
        const deletedMembers = await oldProjectMembers.delete()

        if ( (deletedLeaders || !(await oldProjectLeaders)) ) {

          for (let leader of leaders) {
            const leaderfnd = await this.userModel.query().findOne({id: leader, brandCode: currentUser.brandCode})
            if (!leaderfnd) {
              return {
                success: false,
                message: 'Member Error: User ' + leader + ' doesnt exist.',
                data: {},
              };
            }
            const leadersParams = {leaderId: leader , projectId: projectPayload.id}
            let finishedInsert = await this.leaderModelClass.query(trx).insert(leadersParams)
            if (!finishedInsert) {
              throw finishedInsert
            }
          }
        }

        if ( (deletedMembers || !(await oldProjectMembers)) ) {

          for (let member of members) {
            const memberfnd = await this.userModel.query().findOne({id: member, brandCode: currentUser.brandCode})
            if (!memberfnd) {
              return {
                success: false,
                message: 'Member Error: User ' + member + ' doesnt exist.',
                data: {},
              };
            }
            const membersParams = {memberId: member , projectId: projectPayload.id}
            let finishedInsert = await this.memberModelClass.query(trx).insert(membersParams)
            if (!finishedInsert) {
              throw finishedInsert
            }
          }
          await trx.commit()
        }
      } catch(err) {
        trx.rollback();
        result = err
        return {
          success: false,
          message: `Something went wrong. Task were not inserted.`,
          data: result,
        };
      }

      const updatedProject = await this.modelClass.query()
        .update({
          name: projectPayload.name ? projectPayload.name : project.name,
          actualStartDate: projectPayload.actualStartDate ? projectPayload.actualStartDate : project.actualStartDate,
          actualdEndDate: projectPayload.actualdEndDate ? projectPayload.actualdEndDate : project.actualdEndDate,
          plannedEndDate: projectPayload.plannedEndDate ? projectPayload.plannedEndDate : project.plannedEndDate,
          plannedStartDate: projectPayload.plannedStartDate ? projectPayload.plannedStartDate : project.plannedStartDate,
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
        message: 'Project details updated successfully.',
        data: updatedProject,
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

  async removeFile(payload: {id: number,attachId: number}, currentUser): Promise<ResponseData> {
    const project = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(payload.id)
    .withGraphFetched({attachments: {}});
    if (!project) {
      return {
        success: false,
        message: "Project not found",
        data: {},
      }
    }
    const projectAttachment = await this.projectAttachmentModel.query()
    .findOne({projectId: project.id, attachmentId: payload.attachId})

    if (!projectAttachment) {
      return {
        success: false,
        message: "attachment on this Project not found",
        data: {},
      }
    }
    await this.projectAttachmentModel.query()
    .delete()
    .where({attachmentId: payload.attachId,projectId: payload.id})
    const deletedFileService = await this.fileUploadService.removeFile(payload.attachId,currentUser);
    if (!deletedFileService.success) {
      return deletedFileService
    }
    return {
      success: true,
      message: 'Project Attachments removed successfully.',
      data: {},
    }
  }

  async replaceFiles(payload: AddFileDto, currentUser): Promise<ResponseData> {
    const {files,id} = payload
    const project = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(id)
    .withGraphFetched({attachments: {}});
    if (!project) {
      return {
        success: false,
        message: "Project not found",
        data: {},
      }
    }

    const allFileIds = []
    for (let file of files) {
      const prepFile: FileParamDto = {
        originalname: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype,
        size: file.size,
      }

      const uploadedFileService = await this.fileUploadService.addFile(prepFile, "projects", currentUser);
      if (!uploadedFileService.success) {
        return {
          success: false,
          message: uploadedFileService.message,
          data: uploadedFileService.data,
        }
      }
      allFileIds.push(uploadedFileService.data.id)
    }
    for (let attId of project.attachments) {
      this.fileUploadService.removeFile(attId.id,currentUser)
    }

    const trx = await this.modelClass.startTransaction()
    try {
      this.projectAttachmentModel.query(trx)
      .delete()
      .where({projectId: id})
      this.attachmentModel.query(trx)
      .delete()
      .findByIds(project.attachments?.map(e => e.id))
      for (let attachId of allFileIds) {
        const insertedAttach = await this.projectAttachmentModel.query(trx)
        .insert({
          attachmentId: attachId,
          projectId: project.id
        });
        if (!insertedAttach) {
          throw {
            message: "couldnt insert projectAttachment on project",
            reason: insertedAttach,
          }
        }
      }

      await trx.commit();
      return {
        success: true,
        message: 'Project Attachments replaced successfully.',
        data: {},
      }
    } catch (err) {
      await trx.rollback();
      return {
        success: false,
        message: `Something went wrong. ProjectAttachments were not replaced.`,
        data: err,
      };
    }
  }

  async addFile(payload: AddFileDto, currentUser): Promise<ResponseData> {
    const {files,id} = payload
    const project = await this.modelClass.query()
    .where({brandCode: currentUser.brandCode})
    .findById(id);
    if (!project) {
      return {
        success: false,
        message: "Project not found",
        data: {},
      }
    }
    const allFileIds = []
    for (let file of files) {
      const prepFile: FileParamDto = {
        originalname: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype,
        size: file.size,
      }

      const uploadedFileService = await this.fileUploadService.addFile(prepFile, "projects", currentUser);
      if (!uploadedFileService.success) {
        return {
          success: false,
          message: uploadedFileService.message,
          data: uploadedFileService.data,
        }
      }
      allFileIds.push(uploadedFileService.data.id)
    }

    const trx = await this.modelClass.startTransaction()
    try {
      for (let attachId of allFileIds) {
        const insertedAttach = await this.projectAttachmentModel.query(trx)
        .insert({
          attachmentId: attachId,
          projectId: project.id
        });
        if (!insertedAttach) {
          throw {
            message: "couldnt insert projectAttachment on project",
            data: insertedAttach,
          }
        }
      }

      await trx.commit();
      return {
        success: true,
        message: 'Project Attachments added successfully.',
        data: {},
      }
    } catch (err) {
      await trx.rollback();
      return {
        success: false,
        message: `Something went wrong. ProjectAttachments were not inserted.`,
        data: err,
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
        message: 'Project deleted successfully.',
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
