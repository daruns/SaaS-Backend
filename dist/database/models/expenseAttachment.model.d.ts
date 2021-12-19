import { BaseModel } from './base.model';
import { AttachmentModel } from './attachment.model';
import { ExpenseModel } from './expense.model';
export declare class ExpenseAttachmentModel extends BaseModel {
    static tableName: string;
    attachmentId: number;
    expenseId: number;
    expense: ExpenseModel;
    attachment: AttachmentModel;
    static relationMappings: {
        expense: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        attachment: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default ExpenseAttachmentModel;
