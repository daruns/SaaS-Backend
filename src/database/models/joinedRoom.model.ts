import { BaseModel } from './base.model';
import { Model } from 'objection';
import { UserModel } from './user.model';
import { RoomModel } from './room.model';

const tableName = 'joinedRooms'
export class JoinedRoomModel extends BaseModel {
  static tableName = tableName;
	brandCode: string
	name: string
	socketId: string
	userId: number
	roomId: number

  user: UserModel;
	room: RoomModel

  static relationMappings = {
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.userId`,
        to: 'users.id',
      },
    },
    room: {
      modelClass: `${__dirname}/room.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.roomId`,
        to: 'rooms.id',
      },
    },
  };
}

export default JoinedRoomModel
