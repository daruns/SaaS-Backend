import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';
import { UserModel } from './user.model';

export class MeetingModel extends BaseModel {
  static tableName = 'meetings';
  date: Date
  duration: number
  type: string
  details: string
  serviceRequirements: string
  nextMeetingDate: Date
  currentServiceProvider: string
  clientId: number
  userId: number

  client: ClientModel;
  user: UserModel

  static relationMappings = {
    // list of all client on current user
    client: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'meetings.clientId',
        to: 'clients.id',
      },
    },
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'meetings.userId',
        to: 'users.id',
      },
    },
  };
}
