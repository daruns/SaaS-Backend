import { BaseModel } from './base.model';
import { ClientModel } from './client.model';
import { InvoiceModel } from './invoice.model';
export declare class ClientContactModel extends BaseModel {
    static tableName: string;
    name: string;
    position: string;
    businessPhoneNumber1: string;
    businessPhoneNumber2: string;
    email: string;
    description: string;
    department: string;
    clientId: number;
    brandCode: string;
    client: ClientModel;
    invoices: InvoiceModel[];
    static relationMappings: {
        client: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        invoices: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default ClientContactModel;
