"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'projectBoards';
class BoardModel extends base_model_1.BaseModel {
}
exports.BoardModel = BoardModel;
BoardModel.tableName = tableName;
BoardModel.relationMappings = {
    tasks: {
        modelClass: `${__dirname}/task.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'tasks.boardId',
        },
    },
    boardAttribute: {
        modelClass: `${__dirname}/boardAttribute.model`,
        relation: objection_1.Model.HasOneRelation,
        join: {
            from: `${tableName}.id`,
            to: 'boardAttributes.boardId',
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
exports.default = BoardModel;
//# sourceMappingURL=board.model.js.map