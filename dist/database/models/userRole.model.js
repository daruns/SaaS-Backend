"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'userRoles';
class UserRoleModel extends base_model_1.BaseModel {
}
exports.UserRoleModel = UserRoleModel;
UserRoleModel.tableName = tbName;
UserRoleModel.relationMappings = {
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
exports.default = UserRoleModel;
//# sourceMappingURL=userRole.model.js.map