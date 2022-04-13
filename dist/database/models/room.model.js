"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'rooms';
class RoomModel extends base_model_1.BaseModel {
}
exports.RoomModel = RoomModel;
RoomModel.tableName = tableName;
RoomModel.relationMappings = {
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
    users: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tableName}.id`,
            through: {
                from: 'roomUsers.roomId',
                to: 'roomUsers.userId',
            },
            to: 'users.id',
        },
    },
};
exports.default = RoomModel;
//# sourceMappingURL=room.model.js.map