"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'joinedRooms';
class JoinedRoomModel extends base_model_1.BaseModel {
}
exports.JoinedRoomModel = JoinedRoomModel;
JoinedRoomModel.tableName = tableName;
JoinedRoomModel.relationMappings = {
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
exports.default = JoinedRoomModel;
//# sourceMappingURL=joinedRoom.model.js.map