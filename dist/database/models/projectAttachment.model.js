"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'projectAttachments';
class ProjectAttachmentModel extends base_model_1.BaseModel {
}
exports.ProjectAttachmentModel = ProjectAttachmentModel;
ProjectAttachmentModel.tableName = tableName;
ProjectAttachmentModel.relationMappings = {
    project: {
        modelClass: `${__dirname}/project.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.projectId`,
            to: 'projects.id',
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
exports.default = ProjectAttachmentModel;
//# sourceMappingURL=projectAttachment.model.js.map