import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ServiceItemModel } from './serviceItem.model';

const tbName = 'subServiceItems';
export class SubServiceItemModel extends BaseModel {
  static tableName = tbName;
  name: string
  description: string
  unitPrice: number
  qty: number
  purchasedAt: Date
  expireDate: Date
  supplier: string
  brandCode: string
  serviceItemId: number

  serviceItem: ServiceItemModel;

  static relationMappings = {
    serviceItem: {
      modelClass: `${__dirname}/serviceItem.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.serviceItemId`,
        to: 'serviceItems.id',
      },
    },
  };
}
