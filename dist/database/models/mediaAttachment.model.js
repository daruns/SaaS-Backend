"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaAttachmentModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'mediaAttachments';
class MediaAttachmentModel extends base_model_1.BaseModel {
}
exports.MediaAttachmentModel = MediaAttachmentModel;
MediaAttachmentModel.tableName = tableName;
MediaAttachmentModel.relationMappings = {
    media: {
        modelClass: `${__dirname}/media.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.mediaId`,
            to: 'medias.id',
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
exports.default = MediaAttachmentModel;
//# sourceMappingURL=mediaAttachment.model.js.map