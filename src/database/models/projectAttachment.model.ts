import { BaseModel } from './base.model';
import { Model } from 'objection';
import { AttachmentModel } from './attachment.model';
import { ProjectModel } from './project.model';

const tableName = 'projectAttachments'
export class ProjectAttachmentModel extends BaseModel {
  static tableName = tableName;

  attachmentId: number
  projectId: number

  project: ProjectModel;
  attachment: AttachmentModel;

  static relationMappings = {
    project: {
      modelClass: `${__dirname}/project.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.projectId`,
        to: 'projects.id',
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

export default ProjectAttachmentModel
