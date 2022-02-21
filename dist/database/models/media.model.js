"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'medias';
class MediaModel extends base_model_1.BaseModel {
}
exports.MediaModel = MediaModel;
MediaModel.tableName = tableName;
MediaModel.relationMappings = {
    socialMediaStudio: {
        modelClass: `${__dirname}/socialMediaStudio.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.socialMediaStudioId`,
            to: 'socialMediaStudios.id',
        },
    },
    mediaAttachments: {
        modelClass: `${__dirname}/mediaAttachment.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'mediaAttachments.projectId',
        },
    },
    attachments: {
        modelClass: `${__dirname}/attachment.model`,
        relation: objection_1.Model.ManyToManyRelation,
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
exports.default = MediaModel;
//# sourceMappingURL=media.model.js.map