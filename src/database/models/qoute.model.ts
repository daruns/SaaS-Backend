import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from "./client.model";
import { ClientContactModel } from './clientContact.model';
import { QouteItemModel } from './qouteItem.model';

export class QouteModel extends BaseModel {
  static tableName = 'qoutes';

  qouteNumber: string
  date: Date
  expiryDate: Date
  exchangeRate: number
  taxRatio: number
  billingAddress: string
  totalAmount: number
  currencyCode: string
  brandCode: string
  discount: number
  clientContactId: number
  clientId: number

  clientContact: ClientContactModel;
  client: ClientModel;
  qouteItems: QouteItemModel[];

  static relationMappings = {
    qouteItems: {
      modelClass: `${__dirname}/qouteItem.model`,
      relation: Model.HasManyRelation,
      join: {
        from: 'qoutes.id',
        to: 'qouteItems.qouteId',
      },
    },

    clientContact: {
      modelClass: `${__dirname}/clientContact.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'qoutes.clientContactId',
        to: 'clientContacts.id',
      }
    },
    // list of all client on current client
    client: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'qoutes.clientId',
        to: 'clients.id',
      },
    },
  };
}
