import { BaseModel } from './base.model';
import { AttachmentModel } from './attachment.model';
import { MediaModel } from './media.model';
export declare class MediaAttachmentModel extends BaseModel {
    static tableName: string;
    attachmentId: number;
    mediaId: number;
    media: MediaModel;
    attachment: AttachmentModel;
    static relationMappings: {
        media: {
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
export default MediaAttachmentModel;
