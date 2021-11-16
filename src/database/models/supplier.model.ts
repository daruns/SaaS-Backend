import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ExpenseModel } from './expense.model';

const tbName = 'suppliers';
export class SupplierModel extends BaseModel {
  static tableName = tbName;

  name: string
  logo: string
  phoneNumbers: string
  supplierType: string
  businessType: string
  email: string
  website: string
  address: string
  rate: number
  zipCode: string
  brandCode: string

  expenses: ExpenseModel[];
  static relationMappings = {
    expenses: {
      modelClass: `${__dirname}/expense.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tbName}.id`,
        to: 'expenses.supplierId',
      },
    },
  };
}
