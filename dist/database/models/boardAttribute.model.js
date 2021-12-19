"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'boardAttributes';
class BoardAttributeModel extends base_model_1.BaseModel {
}
exports.BoardAttributeModel = BoardAttributeModel;
BoardAttributeModel.tableName = tableName;
BoardAttributeModel.relationMappings = {
    board: {
        modelClass: `${__dirname}/board.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.boardId`,
            to: 'projectBoards.id',
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
exports.default = BoardAttributeModel;
//# sourceMappingURL=boardAttribute.model.js.map