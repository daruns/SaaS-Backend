import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';
import { ProjectLeaderModel } from './projectLeader.model';
import { ProjectMemberModel } from './projectMember.model';
import { UserModel } from './user.model';
import { TaskModel } from './task.model';
import { ProjectAttachmentModel } from './projectAttachment.model';
import { AttachmentModel } from './attachment.model';

const tableName = 'projects'
export class ProjectModel extends BaseModel {
  static tableName = tableName;

  name: string
  brandCode: string
  plannedStartDate: Date
  plannedEndDate: Date
  actualStartDate: Date
  actualdEndDate: Date
  rate: number
  rateType: string
  priority: string
  description: string
  clientId: number

  client: ClientModel;
  leaders: ProjectLeaderModel[];
  members: ProjectMemberModel[];
  leaderUsers: UserModel[]
  memberUsers: UserModel[]
  tasks: TaskModel[]
  projectAttachments: ProjectAttachmentModel[];
  attachments: AttachmentModel[];
  // boards: BoardModel[];


  static relationMappings = {
    // list of all user on current projects
    client: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.clientId`,
        to: 'clients.id',
      },
    },
    // list of all leaders on current project
    leaders: {
      modelClass: `${__dirname}/projectLeader.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'projectLeaderUsers.projectId',
      },
    },
    // list of all members on current project
    members: {
      modelClass: `${__dirname}/projectMember.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'projectMemberUsers.projectId'
      },
    },
    // list of all leaders on current project
    leaderUsers: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `${tableName}.id`,
        through: {
          from: 'projectLeaderUsers.projectId',
          to: 'projectLeaderUsers.leaderId'
        },
        to: 'users.id',
      },
    },
    // list of all leaders on current project
    memberUsers: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `${tableName}.id`,
        through: {
          from: 'projectMemberUsers.projectId',
          to: 'projectMemberUsers.memberId'
        },
        to: 'users.id',
      },
    },
    tasks: {
      modelClass: `${__dirname}/task.model`,
        relation: Model.HasManyRelation,
        join: {
          from: `${tableName}.id`,
          to: 'tasks.projectId',
        },
    },
    projectAttachments: {
      modelClass: `${__dirname}/projectAttachment.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'projectAttachments.projectId',
      },
    },
    attachments: {
      modelClass: `${__dirname}/attachment.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `${tableName}.id`,
        through: {
          from: 'projectAttachments.projectId',
          to: 'projectAttachments.attachmentId'
        },
        to: 'attachments.id',
      },
    },
    // boards: {
    //   modelClass: `${__dirname}/board.model`,
    //   relation: Model.HasManyRelation,
    //   join: {
    //     from: `${tableName}.id`,
    //     to: 'projectBoards.projectId',
    //   },
    // }
  };
}
