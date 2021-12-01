import { BaseModel } from './base.model';
import { Model } from 'objection';
import { SubServiceItemModel } from './subServiceItem.model';

const tbName = 'serviceItems';
export class ServiceItemModel extends BaseModel {
  static tableName = tbName;

  name: string
  description: string
  unitPrice: number
  qty: number
  purchasedAt: Date
  expireDate: Date
  supplier: string
  brandCode: string

  subServiceItems: SubServiceItemModel[];

  static relationMappings = {
    subServiceItems: {
      modelClass: `${__dirname}/subServiceItem.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tbName}.id`,
        to: 'subServiceItems.serviceItemId',
      },
    },
  };
}

export default ServiceItemModel
