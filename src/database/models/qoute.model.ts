import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from "./client.model";
import { ClientContactModel } from './clientContact.model';
import { QouteItemModel } from './qouteItem.model';

export class QouteModel extends BaseModel {
  static tableName = 'qoutes';

  qouteNumber: string
  brandCode: string
  description: string
  date: Date
  dueDate: Date
  currencyCode: string
  exchangeRate: number
  billingAddress: string
  paymentMethod: string
  taxRate: number
  discount: number
  subTotalAmount: number
  totalAmount: number
  clientId: number
  clientContactId: number

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
