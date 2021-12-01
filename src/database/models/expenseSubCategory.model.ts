import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ExpenseCategoryModel } from './expenseCategory.model';

const tbName = 'expenseSubCategories';
export class ExpenseSubCategoryModel extends BaseModel {
  static tableName = tbName;

  name: string
  description: string
  brandCode: string
  expenseCategoryId: number

	expenseCategory: ExpenseCategoryModel;

  static relationMappings = {
		expenseCategory: {
      modelClass: `${__dirname}/expenseCategory.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.expenseCategoryId`,
        to: 'expenseCategories.id',
      },
    },
  };
}

export default ExpenseSubCategoryModel
