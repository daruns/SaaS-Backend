import { BaseModel } from './base.model';
import { ExpenseCategoryModel } from './expenseCategory.model';
import ExpenseChildSubCategoryModel from './expenseChildSubCategory.model';
export declare class ExpenseSubCategoryModel extends BaseModel {
    static tableName: string;
    name: string;
    description: string;
    brandCode: string;
    expenseCategoryId: number;
    expenseChildSubCategories: ExpenseChildSubCategoryModel[];
    expenseCategory: ExpenseCategoryModel;
    static relationMappings: {
        expenseChildSubCategories: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        expenseCategory: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default ExpenseSubCategoryModel;
