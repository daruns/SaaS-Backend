import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ExpenseModel } from './expense.model'

const tableName = 'expenseItems'
export class ExpenseItemModel extends BaseModel {
  static tableName = tableName;

  name: string
  category: boolean
  itemId: number
  description: string
  unitPrice: number
  qty: number
  brandCode: string
  expenseId: number

  expense: ExpenseModel;

  static relationMappings = {
    expense: {
      modelClass: `${__dirname}/expense.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.expenseId.`,
        to: 'expenses.id',
      }
    },
  };
}
