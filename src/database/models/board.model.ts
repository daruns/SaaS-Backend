import { BaseModel } from './base.model';
import { Model } from 'objection';
import { UserModel } from './user.model';
import { BoardAttributeModel } from './boardAttribute.model';
import { TaskModel } from './task.model';

const tableName = 'projectBoards'
export class BoardModel extends BaseModel {
  static tableName = tableName;

  name: string
  description: string
  brandCode: string
  userId: number

  boardAttribute: BoardAttributeModel[];
  user: UserModel;
  tasks: TaskModel[];

  static relationMappings = {
    tasks: {
    // list of all tasks on current user
      modelClass: `${__dirname}/task.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'tasks.boardId',
      },
    },
    // list of all client on current user
    boardAttribute: {
      modelClass: `${__dirname}/boardAttribute.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'boardAttributes.boardId',
      },
    },
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.userId`,
        to: 'users.id',
      },
    },
  };
}
