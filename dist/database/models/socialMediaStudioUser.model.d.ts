import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { SocialMediaStudioModel } from './socialMediaStudio.model';
export declare class SocialMediaStudioUserModel extends BaseModel {
    static tableName: string;
    approved: boolean;
    canEdit: boolean;
    userId: number;
    socialMediaStudioId: number;
    user: UserModel;
    socialMediaStudio: SocialMediaStudioModel;
    static relationMappings: {
        user: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        socialMediaStudio: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default SocialMediaStudioUserModel;
