import { BaseModel } from './base.model';
import { ExpenseModel } from './expense.model';
export declare class ExpenseItemModel extends BaseModel {
    static tableName: string;
    name: string;
    category: boolean;
    itemId: number;
    description: string;
    unitPrice: number;
    qty: number;
    brandCode: string;
    expenseId: number;
    expense: ExpenseModel;
    static relationMappings: {
        expense: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default ExpenseItemModel;
