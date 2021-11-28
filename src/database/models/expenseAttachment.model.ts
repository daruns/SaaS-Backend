import { BaseModel } from './base.model';
import { Model } from 'objection';
import { AttachmentModel } from './attachment.model';
import { ExpenseModel } from './expense.model';

const tableName = 'expenseAttachments'
export class ExpenseAttachmentModel extends BaseModel {
  static tableName = tableName;

  attachmentId: number
  expenseId: number

  expense: ExpenseModel;
  attachment: AttachmentModel;

  static relationMappings = {
    expense: {
      modelClass: `${__dirname}/expense.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.expenseId`,
        to: 'expenses.id',
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
