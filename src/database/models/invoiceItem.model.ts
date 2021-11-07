import { BaseModel } from './base.model';
import { Model } from 'objection';
import { InvoiceModel } from './invoice.model'

const tableName = 'invoiceItems'
export class InvoiceItemModel extends BaseModel {
  static tableName = tableName;

  name: string
  category: string
  itemId: number
  description: string
  unitPrice: number
  qty: number
  purchasedAt: Date
  expireDate: Date
  supplier: string
  brandCode: string
  invoiceId: number

  invoice: InvoiceModel;

  static relationMappings = {
    invoice: {
      modelClass: `${__dirname}/invoice.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.invoiceId.`,
        to: 'invoices.id',
      }
    },
  };
}
