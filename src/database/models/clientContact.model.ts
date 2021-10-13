import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';

export class ClientContactModel extends BaseModel {
  static tableName = 'clientContacts';

  name: string
  position: string
  businessPhoneNumber1: string
  businessPhoneNumber2: string
  email: string
  description: string
  department: string
  clientId: number

  client: ClientModel;

  static relationMappings = {
    // list of all client on current user
    client: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'clientContacts.clientId',
        to: 'clients.id',
      },
    },
  };
}
