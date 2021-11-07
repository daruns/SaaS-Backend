import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ProjectModel } from './project.model';
import { BoardModel } from './board.model';

const tableName = 'tasks'
export class TaskModel extends BaseModel {
  static tableName = tableName;
  name: string
  brandCode: string
  description: string
  priority: string
  plannedStartDate: Date
  plannedEndDate: Date
  actualStartDate: Date
  actualdEndDate: Date
  boardId: number
  projectId: number

  board: BoardModel;
  project: ProjectModel;

  static relationMappings = {
    // list of all board on current user
    board: {
      modelClass: `${__dirname}/board.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.boardId`,
        to: 'projectBoards.id',
      },
    },
    // list of all board on current user
    project: {
      modelClass: `${__dirname}/project.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.projectId`,
        to: 'projects.id',
      },
    },
    members: {
      modelClass: `${__dirname}/taskMember.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'taskMemberUsers.taskId'
      },
    },
    // list of all leaders on current project
    memberUsers: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `${tableName}.id`,
        through: {
          from: 'taskMemberUsers.taskId',
          to: 'taskMemberUsers.memberId'
        },
        to: 'users.id',
      },
    },

  };
}
