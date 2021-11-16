import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ExpenseModel } from './expense.model';

const tbName = 'paymentMethods';
export class PaymentMethodModel extends BaseModel {
  static tableName = tbName;

  name: string
  type: string
  description: string
  expireDate: Date
  pin: string
  cvs: string
  brandCode: string

  expenses: ExpenseModel[];
  static relationMappings = {
    expenses: {
      modelClass: `${__dirname}/expense.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tbName}.id`,
        to: 'expenses.paymentMethodId',
      },
    },
  };
}
