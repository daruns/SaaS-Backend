import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { ClientContactModel } from "./clientContact.model";
import { MeetingModel } from './meeting.model';
import { SocialMediaModel } from './socialMedia.model';
export declare class ClientModel extends BaseModel {
    static tableName: string;
    name: string;
    logo: string;
    phoneNumbers: string;
    phoneNumber1: string;
    phoneNumber2: string;
    clientType: string;
    businessType: string;
    email: string;
    website: string;
    address: string;
    rate: number;
    zipCode: string;
    userId: number;
    user: UserModel;
    clientContacts: ClientContactModel[];
    meetings: MeetingModel[];
    socialMedias: SocialMediaModel[];
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
    };
}
