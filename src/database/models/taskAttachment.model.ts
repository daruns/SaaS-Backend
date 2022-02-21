import { BaseModel } from './base.model';
import { Model } from 'objection';
import { AttachmentModel } from './attachment.model';
import { TaskModel } from './task.model';

const tableName = 'taskAttachments'
export class TaskAttachmentModel extends BaseModel {
  static tableName = tableName;

  attachmentId: number
  taskId: number

  task: TaskModel;
  attachment: AttachmentModel;

  static relationMappings = {
    task: {
      modelClass: `${__dirname}/task.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.taskId`,
        to: 'tasks.id',
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

export default TaskAttachmentModel
