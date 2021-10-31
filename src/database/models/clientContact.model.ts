import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from './client.model';
import { InvoiceModel } from './invoice.model';

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
  brandCode: string

  client: ClientModel;
  invoices: InvoiceModel[];

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
    invoices: {
      modelClass: `${__dirname}/invoice.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'clientContacts.id',
        to: 'invoices.clientContactid',
      },
    },
  };
}
