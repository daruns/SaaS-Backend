import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';

const tableName = 'meetings'
export class MeetingModel extends BaseModel {
  static tableName = tableName;
  date: Date
  duration: number
  type: string
  details: string
  serviceRequirements: string
  nextMeetingDate: Date
  currentServiceProvider: string
  clientId: number
  brandCode: string

  client: ClientModel;

  static relationMappings = {
    // list of all client on current user
    client: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.clientId`,
        to: 'clients.id',
      },
    },
  };
}
