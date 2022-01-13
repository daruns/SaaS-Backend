import { BaseModel } from './base.model';
import { Model } from 'objection';
import SocialMediaStudioModel from './socialMediaStudio.model';
import MediaAttachmentModel from './mediaAttachment.model';
import AttachmentModel from './attachment.model';

const tableName = 'medias'
export class MediaModel extends BaseModel {
  static tableName = tableName;

  name: string
  priority: string
  brandCode: string
  title: string
  caption: string
  textOnDesign: string
  designSize: string
  type: string
  plannedStartDate: Date
  plannedEndDate: Date
  actualStartDate: Date
  actualdEndDate: Date
  socialMediaStudioId: number

  socialMediaStudio: SocialMediaStudioModel;
  mediaAttachments: MediaAttachmentModel[];
  attachments: AttachmentModel[];

  static relationMappings = {
    socialMediaStudio: {
      modelClass: `${__dirname}/socialMediaStudio.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.socialMediaStudioId`,
        to: 'socialMediaStudios.id',
      },
    },
    mediaAttachments: {
      modelClass: `${__dirname}/mediaAttachment.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'mediaAttachments.projectId',
      },
    },
    attachments: {
      modelClass: `${__dirname}/attachment.model`,
      relation: Model.ManyToManyRelation,
      join: {
        from: `${tableName}.id`,
        through: {
          from: 'mediaAttachments.projectId',
          to: 'mediaAttachments.attachmentId'
        },
        to: 'attachments.id',
      },
    },
  };
}

export default MediaModel
