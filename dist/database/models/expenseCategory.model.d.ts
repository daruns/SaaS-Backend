import { BaseModel } from './base.model';
import { ExpenseSubCategoryModel } from './expenseSubCategory.model';
export declare class ExpenseCategoryModel extends BaseModel {
    static tableName: string;
    name: string;
    description: string;
    brandCode: string;
    expenseSubCategories: ExpenseSubCategoryModel[];
    static relationMappings: {
        expenseSubCategories: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default ExpenseCategoryModel;
