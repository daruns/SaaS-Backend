import { BaseModel } from './base.model';
import { ExpenseModel } from './expense.model';
export declare class SupplierModel extends BaseModel {
    static tableName: string;
    name: string;
    logo: string;
    phoneNumbers: string;
    supplierType: string;
    businessType: string;
    email: string;
    website: string;
    address: string;
    rate: number;
    zipCode: string;
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
export default SupplierModel;
