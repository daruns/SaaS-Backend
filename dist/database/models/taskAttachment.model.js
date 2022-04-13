"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAttachmentModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'taskAttachments';
class TaskAttachmentModel extends base_model_1.BaseModel {
}
exports.TaskAttachmentModel = TaskAttachmentModel;
TaskAttachmentModel.tableName = tableName;
TaskAttachmentModel.relationMappings = {
    task: {
        modelClass: `${__dirname}/task.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.taskId`,
            to: 'tasks.id',
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
exports.default = TaskAttachmentModel;
//# sourceMappingURL=taskAttachment.model.js.map