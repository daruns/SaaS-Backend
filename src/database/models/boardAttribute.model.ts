import { BaseModel } from './base.model';
import { Model } from 'objection';
import { BoardModel } from './board.model';
import { UserModel } from './user.model';

const tableName = 'boardAttributes'
export class BoardAttributeModel extends BaseModel {
  static tableName = tableName;

  color: string
  position: number
  brandCode: string
  boardId: number
  userId: number

  board: BoardModel;
  user: UserModel;

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

export default BoardAttributeModel
