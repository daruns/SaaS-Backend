"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModel = void 0;
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
};
exports.default = PermissionModel;
//# sourceMappingURL=permission.model.js.map