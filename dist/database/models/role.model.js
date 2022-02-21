"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'roles';
class RoleModel extends base_model_1.BaseModel {
}
exports.RoleModel = RoleModel;
RoleModel.tableName = tbName;
RoleModel.relationMappings = {
    users: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tbName}.id`,
            through: {
                from: 'userRoles.roleId',
                to: 'usersRoles.userId'
            },
            to: 'users.id',
        },
    },
    userRoles: {
        modelClass: `${__dirname}/userRole.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'userRoles.userId',
        },
    },
    permissions: {
        modelClass: `${__dirname}/permission.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'permissions.roleId',
        },
    },
};
exports.default = RoleModel;
//# sourceMappingURL=role.model.js.map