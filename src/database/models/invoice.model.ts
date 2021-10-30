import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ClientModel } from "./client.model";

export class InvoiceModel extends BaseModel {
  static tableName = 'invoices';
  id: number
  invoiceNumber :string
  date :Date
  dueDate :Date
  taxRatio :number
  billingAddress :number
  totalAmount :number
  currencyCode: number
  brandCode :string
  clientId :number

  client: ClientModel;

  static relationMappings = {
    // list of all client on current client
    client: {
      modelClass: `${__dirname}/client.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'clients.clientId',
        to: 'clients.id',
      },
    },
  };
}
