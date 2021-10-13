"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
class GroupModel extends base_model_1.BaseModel {
}
exports.GroupModel = GroupModel;
GroupModel.tableName = 'groups';
GroupModel.relationMappings = {
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: 'groups.userId',
            to: 'users.id',
        },
    },
    permissions: {
        modelClass: `${__dirname}/permission.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: 'groups.id',
            to: 'permissions.groupId',
        },
    },
};
//# sourceMappingURL=group.model.js.map