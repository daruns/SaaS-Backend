import { BaseModel } from './base.model';
import { Model } from 'objection';
import { AttachmentModel } from './attachment.model';
import { MediaModel } from './media.model';

const tableName = 'mediaAttachments'
export class MediaAttachmentModel extends BaseModel {
  static tableName = tableName;

  attachmentId: number
  mediaId: number

  media: MediaModel;
  attachment: AttachmentModel;

  static relationMappings = {
    media: {
      modelClass: `${__dirname}/media.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.mediaId`,
        to: 'medias.id',
      },
    },

    attachment: {
      modelClass: `${__dirname}/attachment.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.attachmentId`,
        to: 'attachments.id',
      },
    },
  };
}

export default MediaAttachmentModel
