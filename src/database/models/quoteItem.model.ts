import { BaseModel } from './base.model';
import { Model } from 'objection';
import { QuoteModel } from './quote.model'

const tableName = 'quoteItems'
export class QuoteItemModel extends BaseModel {
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
  quoteId: number

  quote: QuoteModel;

  static relationMappings = {
    quote: {
      modelClass: `${__dirname}/quote.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.quoteId`,
        to: 'quotes.id',
      }
    },
  };
}

export default QuoteItemModel
