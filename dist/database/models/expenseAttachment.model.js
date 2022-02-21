"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseAttachmentModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'expenseAttachments';
class ExpenseAttachmentModel extends base_model_1.BaseModel {
}
exports.ExpenseAttachmentModel = ExpenseAttachmentModel;
ExpenseAttachmentModel.tableName = tableName;
ExpenseAttachmentModel.relationMappings = {
    expense: {
        modelClass: `${__dirname}/expense.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.expenseId`,
            to: 'expenses.id',
        },
    },
    attachment: {
        modelClass: `${__dirname}/attachment.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.attachmentId`,
            to: 'attachments.id',
        },
    },
};
exports.default = ExpenseAttachmentModel;
//# sourceMappingURL=expenseAttachment.model.js.map