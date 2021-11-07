import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from "./client.model";
import { ClientContactModel } from './clientContact.model';
import { QouteItemModel } from './qouteItem.model';

const tableName = 'qoutes'
export class QouteModel extends BaseModel {
  static tableName = tableName;

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
        from: `${tableName}.id`,
        to: 'qouteItems.qouteId',
      },
    },

    clientContact: {
      modelClass: `${__dirname}/clientContact.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.clientContactId`,
        to: 'clientContacts.id',
      }
    },
    // list of all client on current client
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
