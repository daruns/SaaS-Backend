import { BaseModel } from './base.model';
import { ExpenseSubCategoryModel } from './expenseSubCategory.model';
export declare class ExpenseChildSubCategoryModel extends BaseModel {
    static tableName: string;
    name: string;
    description: string;
    brandCode: string;
    expenseSubCategoryId: number;
    expenseSubCategory: ExpenseSubCategoryModel;
    static relationMappings: {
        expenseSubCategory: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default ExpenseChildSubCategoryModel;
