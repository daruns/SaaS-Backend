import { BaseModel } from './base.model';
import SocialMediaStudioModel from './socialMediaStudio.model';
import MediaAttachmentModel from './mediaAttachment.model';
import AttachmentModel from './attachment.model';
export declare class MediaModel extends BaseModel {
    static tableName: string;
    name: string;
    priority: string;
    brandCode: string;
    title: string;
    caption: string;
    textOnDesign: string;
    designSize: string;
    type: string;
    plannedStartDate: Date;
    plannedEndDate: Date;
    actualStartDate: Date;
    actualdEndDate: Date;
    socialMediaStudioId: number;
    socialMediaStudio: SocialMediaStudioModel;
    mediaAttachments: MediaAttachmentModel[];
    attachments: AttachmentModel[];
    static relationMappings: {
        socialMediaStudio: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        mediaAttachments: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        attachments: {
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
export default MediaModel;
