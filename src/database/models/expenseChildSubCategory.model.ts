import { BaseModel } from './base.model';
import { Model } from 'objection';
import { ExpenseSubCategoryModel } from './expenseSubCategory.model';

const tbName = 'expenseChildSubCategories';
export class ExpenseChildSubCategoryModel extends BaseModel {
  static tableName = tbName;

  name: string
  description: string
  brandCode: string
  expenseSubCategoryId: number

	expenseSubCategory: ExpenseSubCategoryModel;

  static relationMappings = {
		expenseSubCategory: {
      modelClass: `${__dirname}/expenseSubCategory.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tbName}.expenseSubCategoryId`,
        to: 'expenseCategories.id',
      },
    },
  };
}

export default ExpenseChildSubCategoryModel
