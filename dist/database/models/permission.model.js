"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
class PermissionModel extends base_model_1.BaseModel {
}
exports.PermissionModel = PermissionModel;
PermissionModel.tableName = 'permissions';
PermissionModel.relationMappings = {
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: 'permissions.userId',
            to: 'users.id',
        },
    },
    group: {
        modelClass: `${__dirname}/group.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: 'permissions.groupId',
            to: 'groups.id',
        },
    },
};
//# sourceMappingURL=permission.model.js.map