import { BaseModel } from './base.model';
import { Model } from 'objection';
import { UserModel } from './user.model';

const tbName = 'nonInventoryItems'
export class NonInventoryItemModel extends BaseModel {
  static tableName = tbName;

  name: string
  description: string
  unitPrice: number
  qty: number
  purchasedAt: Date
  expireDate: Date
  supplier: string
  userId: number

  user: UserModel;

  static relationMappings = {
    user: {
      modelClass: `${__dirname}/user.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.userId`,
        to: 'users.id',
      },
    },
  };
}
