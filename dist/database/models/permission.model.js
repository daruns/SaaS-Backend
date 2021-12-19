"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'permissions';
class PermissionModel extends base_model_1.BaseModel {
}
exports.PermissionModel = PermissionModel;
PermissionModel.tableName = tbName;
PermissionModel.relationMappings = {
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.userId`,
            to: 'users.id',
        },
    },
    role: {
        modelClass: `${__dirname}/role.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.roleId`,
            to: 'roles.id',
        },
    },
};
exports.default = PermissionModel;
//# sourceMappingURL=permission.model.js.map