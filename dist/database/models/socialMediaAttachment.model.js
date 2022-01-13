"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'socialMediaAttachments';
class SocialMediaAttachmentModel extends base_model_1.BaseModel {
}
exports.SocialMediaAttachmentModel = SocialMediaAttachmentModel;
SocialMediaAttachmentModel.tableName = tableName;
SocialMediaAttachmentModel.relationMappings = {
    socialMedia: {
        modelClass: `${__dirname}/socialMedia.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.socialMediaId`,
            to: 'socialMedias.id',
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
exports.default = SocialMediaAttachmentModel;
//# sourceMappingURL=socialMediaAttachment.model.js.map