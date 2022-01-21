import { BaseModel } from './base.model';
import { ExpenseCategoryModel } from './expenseCategory.model';
export declare class ExpenseSubCategoryModel extends BaseModel {
    static tableName: string;
    name: string;
    description: string;
    brandCode: string;
    expenseCategoryId: number;
    expenseCategory: ExpenseCategoryModel;
    static relationMappings: {
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
