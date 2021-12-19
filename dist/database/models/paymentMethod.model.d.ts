import { BaseModel } from './base.model';
import { ExpenseModel } from './expense.model';
export declare class PaymentMethodModel extends BaseModel {
    static tableName: string;
    name: string;
    type: string;
    description: string;
    expireDate: Date;
    pin: string;
    cvs: string;
    brandCode: string;
    expenses: ExpenseModel[];
    static relationMappings: {
        expenses: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default PaymentMethodModel;
