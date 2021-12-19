"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'connectedUsers';
class ConnectedUserModel extends base_model_1.BaseModel {
}
exports.ConnectedUserModel = ConnectedUserModel;
ConnectedUserModel.tableName = tableName;
ConnectedUserModel.relationMappings = {
    joinedRooms: {
        modelClass: `${__dirname}/joinedRoom.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'messages.roomId',
        },
    },
    messages: {
        modelClass: `${__dirname}/message.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'messages.messageId',
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
};
exports.default = ConnectedUserModel;
//# sourceMappingURL=connectedUser.model.js.map