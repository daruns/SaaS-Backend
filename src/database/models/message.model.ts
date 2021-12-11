import { BaseModel } from './base.model';
import { Model } from 'objection';
import { UserModel } from './user.model';
import { RoomModel } from './room.model';
import AttachmentModel from './attachment.model';

const tableName = 'messages'
export class MessageModel extends BaseModel {
  static tableName = tableName;
  brandCode: string
  name: string
  text: string
  userId: number
  roomId: number

  user: UserModel;
  room: RoomModel;
  attachments: AttachmentModel[];

  static relationMappings = {
    attachments: {
      modelClass: `${__dirname}/attachment.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `${tableName}.id`,
        through: {
          from: `messageAttachments.messageId`,
          to: 'messageAttachments.attachmentId',
        },
        to: 'attachments.id',
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

export default MessageModel
