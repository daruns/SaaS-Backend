import { BaseModel } from './base.model';
import { Model } from 'objection';
import { UserModel } from './user.model';
import JoinedRoomModel from './joinedRoom.model';
import MessageModel from './message.model';

const tableName = 'connectedUsers'
export class ConnectedUserModel extends BaseModel {
  static tableName = tableName;
  socketId: string
  brandCode: string
  userId: number

  user: UserModel;
  joinedRooms: JoinedRoomModel[];
  messages: MessageModel[];

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

export default ConnectedUserModel
