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
    taxRate: number;
    discount: number;
    subTotalAmount: number;
    totalAmount: number;
    clientName: string;
    clientEmail: string;
    clientLogo: string;
    clientClientType: string;
    clientBusinessType: string;
    clientAddress: string;
    clientPhoneNumbers: string;
    clientWebsite: string;
    clientContactName: string;
    clientContactPosition: string;
    clientContactEmail: string;
    clientContactBusinessPhoneNumber1: string;
    clientContactBusinessPhoneNumber2: string;
    clientContactDescription: string;
    clientContactDepartment: string;
    paymentMethodName: string;
    taxName: string;
    bankFee: number;
    clientId: number;
    clientContactId: number;
    paymentMethodId: number;
    taxId: number;
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
