import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { SocialMediaModel } from './socialMedia.model';
export declare class SocialMediaUserModel extends BaseModel {
    static tableName: string;
    userId: number;
    socialMediaId: number;
    user: UserModel;
    socialMedia: SocialMediaModel;
    static relationMappings: {
        user: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        socialMedia: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default SocialMediaModel;
