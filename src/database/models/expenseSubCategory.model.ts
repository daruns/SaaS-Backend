import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ExpenseCategoryModel } from './expenseCategory.model';
import ExpenseChildSubCategoryModel from './expenseChildSubCategory.model';

const tbName = 'expenseSubCategories';
export class ExpenseSubCategoryModel extends BaseModel {
  static tableName = tbName;

  name: string
  description: string
  brandCode: string
  expenseCategoryId: number

  expenseChildSubCategories: ExpenseChildSubCategoryModel[];
	expenseCategory: ExpenseCategoryModel;

  static relationMappings = {
    expenseChildSubCategories: {
      modelClass: `${__dirname}/expenseChildSubCategory.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tbName}.id`,
        to: 'expenseChildSubCategories.expenseSubCategoryId',
      },
    },
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
