import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ExpenseSubCategoryModel } from './expenseSubCategory.model';

const tbName = 'expenseCategories';
export class ExpenseCategoryModel extends BaseModel {
  static tableName = tbName;

  name: string
  description: string
  brandCode: string
  expenseSubCategories: ExpenseSubCategoryModel[];
  static relationMappings = {
    expenseSubCategories: {
        modelClass: `${__dirname}/expenseSubCategory.model`,
        relation: Model.HasManyRelation,
        join: {
          from: `${tbName}.id`,
          to: 'expenseSubCategories.expenseCategoryId',
        },
      },  
  };
}

export default ExpenseCategoryModel
