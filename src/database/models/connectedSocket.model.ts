import { BaseModel } from './base.model';
import { Model } from 'objection';
import { UserModel } from './user.model';

const tableName = 'connectedSockets'
export class ConnectedSocketModel extends BaseModel {
  static tableName = tableName;
  socketId: string
  brandCode: string
  userId: number

  user: UserModel;

  static relationMappings = {
    joinedRooms: {
			modelClass: `${__dirname}/joinedRoom.model`,
			relation: Model.HasManyRelation,
			join: {
				from: `${tableName}.id`,
				to: 'messages.roomId',
			},
		},
		messages: {
			modelClass: `${__dirname}/message.model`,
			relation: Model.HasManyRelation,
			join: {
				from: `${tableName}.id`,
				to: 'messages.messageId',
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

export default ConnectedSocketModel
