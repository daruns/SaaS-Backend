import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { ClientContactModel } from "./clientContact.model";
import { MeetingModel } from './meeting.model';
import { SocialMediaModel } from './socialMedia.model';
import { InvoiceItemModel } from './invoiceItem.model';
export declare class ClientModel extends BaseModel {
    static tableName: string;
    name: string;
    logo: string;
    phoneNumbers: string;
    clientType: string;
    businessType: string;
    email: string;
    website: string;
    address: string;
    rate: number;
    zipCode: string;
    brandCode: string;
    userId: number;
    user: UserModel;
    clientContacts: ClientContactModel[];
    meetings: MeetingModel[];
    socialMedias: SocialMediaModel[];
    invoices: InvoiceItemModel[];
    static relationMappings: {
        user: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        clientContacts: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        meetings: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        socialMedias: {
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
export default ClientModel;
