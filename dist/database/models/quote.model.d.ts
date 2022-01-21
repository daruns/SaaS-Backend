import { BaseModel } from './base.model';
import { ClientModel } from "./client.model";
import { ClientContactModel } from './clientContact.model';
import { QuoteItemModel } from './quoteItem.model';
export declare class QuoteModel extends BaseModel {
    static tableName: string;
    quoteNumber: string;
    brandCode: string;
    description: string;
    date: Date;
    dueDate: Date;
    currencyCode: string;
    exchangeRate: number;
    billingAddress: string;
    paymentMethod: string;
    taxRate: number;
    discount: number;
    subTotalAmount: number;
    totalAmount: number;
    clientId: number;
    clientContactId: number;
    clientContact: ClientContactModel;
    client: ClientModel;
    quoteItems: QuoteItemModel[];
    static relationMappings: {
        quoteItems: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        clientContact: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        client: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default QuoteModel;
