import { BaseModel } from './base.model';
import { Model } from 'objection';
import { UserModel } from './user.model';
import { JoinedRoomModel } from './joinedRoom.model';
import { MessageModel } from './message.model';

const tableName = 'rooms'
export class RoomModel extends BaseModel {
  static tableName = tableName;
  brandCode: string
  name: string
  description: string
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
    users: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `${tableName}.id`,
        through: {
          from: 'roomUsers.roomId',
          to: 'roomUsers.userId',
        },
        to: 'users.id',
      },
    },
  };
}

export default RoomModel
