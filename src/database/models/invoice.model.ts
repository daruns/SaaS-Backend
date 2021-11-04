import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from "./client.model";
import { ClientContactModel } from './clientContact.model';
import { InvoiceItemModel } from './invoiceItem.model';

export class InvoiceModel extends BaseModel {
  static tableName = 'invoices';

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
        from: 'invoices.id',
        to: 'invoiceItems.invoiceId',
      },
    },

    clientContact: {
      modelClass: `${__dirname}/clientContact.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'invoices.clientContactId',
        to: 'clientContacts.id',
      }
    },
    // list of all client on current client
    client: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'invoices.clientId',
        to: 'clients.id',
      },
    },
  };
}
