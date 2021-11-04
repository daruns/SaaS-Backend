import { BaseModel } from './base.model';
import { Model } from 'objection';
import { InvoiceModel } from './invoice.model'

export class InvoiceItemModel extends BaseModel {
  static tableName = 'invoiceItems';

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
        from: 'invoiceItems.invoiceId.',
        to: 'invoices.id',
      }
    },
  };
}
