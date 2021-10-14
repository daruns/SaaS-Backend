import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';

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

  client: ClientModel;

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
  };
}
