import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';
import { ProjectLeaderModel } from './projectLeader.model';
import { ProjectMemberModel } from './projectMember.model';
import { UserModel } from './user.model';

export class ProjectModel extends BaseModel {
  static tableName = 'projects';

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


  static relationMappings = {
    // list of all user on current projects
    client: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'projects.clientId',
        to: 'clients.id',
      },
    },
    // list of all leaders on current project
    leaders: {
      modelClass: `${__dirname}/projectLeader.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `projects.id`,
        to: 'projectLeaderUsers.projectId',
      },
    },
    // list of all members on current project
    members: {
      modelClass: `${__dirname}/projectMember.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `projects.id`,
        to: 'projectMemberUsers.projectId'
      },
    },
    // list of all leaders on current project
    leaderUsers: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `projects.id`,
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
        from: `projects.id`,
        through: {
          from: 'projectMemberUsers.projectId',
          to: 'projectMemberUsers.memberId'
        },
        to: 'users.id',
      },
    },
  };
}
