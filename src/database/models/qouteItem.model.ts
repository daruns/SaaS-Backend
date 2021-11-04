import { BaseModel } from './base.model';
import { Model } from 'objection';
import { QouteModel } from './qoute.model'

export class QouteItemModel extends BaseModel {
  static tableName = 'qouteItems';

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
