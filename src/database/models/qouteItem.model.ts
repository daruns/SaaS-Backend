import { BaseModel } from './base.model';
import { Model } from 'objection';
import { QouteModel } from './qoute.model'

export class QouteItemModel extends BaseModel {
  static tableName = 'qouteItems';
  name: string
  category: string
  itemId: number
  unitPrice: number
  qty: number
  purchasedAt: Date
  expiryDate: Date
  supplier: string
  brandCode: number
  qouteId: number

  qoute: QouteModel;

  static relationMappings = {
    qoute: {
      modelClass: `${__dirname}/qoute.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'qouteItems.qouteId.',
        to: 'qoutes.id',
      }
    },
  };
}
