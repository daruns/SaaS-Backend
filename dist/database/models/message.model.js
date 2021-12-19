"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'messages';
class MessageModel extends base_model_1.BaseModel {
}
exports.MessageModel = MessageModel;
MessageModel.tableName = tableName;
MessageModel.relationMappings = {
    attachments: {
        modelClass: `${__dirname}/attachment.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tableName}.id`,
            through: {
                from: `messageAttachments.messageId`,
                to: 'messageAttachments.attachmentId',
            },
            to: 'attachments.id',
        },
    },
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.userId`,
            to: 'users.id',
        },
    },
    room: {
        modelClass: `${__dirname}/room.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.roomId`,
            to: 'rooms.id',
        },
    },
};
exports.default = MessageModel;
//# sourceMappingURL=message.model.js.map