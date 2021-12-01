import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from "./client.model";
import { ClientContactModel } from './clientContact.model';
import { InvoiceItemModel } from './invoiceItem.model';

const tableName = 'invoices'
export class InvoiceModel extends BaseModel {
  static tableName = tableName;

  invoiceNumber: string
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
  invoiceItems: InvoiceItemModel[];

  static relationMappings = {
    invoiceItems: {
      modelClass: `${__dirname}/invoiceItem.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'invoiceItems.invoiceId',
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

export default InvoiceModel
