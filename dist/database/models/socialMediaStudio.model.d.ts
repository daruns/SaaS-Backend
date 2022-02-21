import { BaseModel } from './base.model';
import { ClientModel } from './client.model';
import MediaModel from './media.model';
import { SocialMediaStudioUserModel } from './socialMediaStudioUser.model';
import UserModel from './user.model';
export declare class SocialMediaStudioModel extends BaseModel {
    static tableName: string;
    name: string;
    brandCode: string;
    clientId: number;
    plannedStartDate: Date;
    plannedEndDate: Date;
    actualStartDate: Date;
    actualdEndDate: Date;
    schedule: Date;
    stage: string;
    priority: string;
    clientApproval: boolean;
    creatorId: number;
    description: string;
    creator: UserModel;
    client: ClientModel;
    users: UserModel[];
    medias: MediaModel[];
    socialMediaStudioUsers: SocialMediaStudioUserModel[];
    static relationMappings: {
        creator: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        medias: {
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
        socialMediaStudioUsers: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        users: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                through: {
                    from: string;
                    to: string;
                };
                to: string;
            };
        };
    };
}
export default SocialMediaStudioModel;
