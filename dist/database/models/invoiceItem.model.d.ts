import { BaseModel } from './base.model';
import { InvoiceModel } from './invoice.model';
export declare class InvoiceItemModel extends BaseModel {
    static tableName: string;
    name: string;
    category: string;
    itemId: number;
    description: string;
    unitPrice: number;
    qty: number;
    purchasedAt: Date;
    expireDate: Date;
    supplier: string;
    brandCode: string;
    invoiceId: number;
    invoice: InvoiceModel;
    static relationMappings: {
        invoice: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default InvoiceItemModel;
