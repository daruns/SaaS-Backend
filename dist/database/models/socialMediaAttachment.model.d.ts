import { BaseModel } from './base.model';
import { AttachmentModel } from './attachment.model';
import { SocialMediaModel } from './socialMedia.model';
export declare class SocialMediaAttachmentModel extends BaseModel {
    static tableName: string;
    attachmentId: number;
    socialMediaId: number;
    socialMedia: SocialMediaModel;
    attachment: AttachmentModel;
    static relationMappings: {
        socialMedia: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        attachment: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default SocialMediaAttachmentModel;
