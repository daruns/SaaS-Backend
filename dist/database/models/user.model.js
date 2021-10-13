"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
class UserModel extends base_model_1.BaseModel {
}
exports.UserModel = UserModel;
UserModel.tableName = 'users';
UserModel.relationMappings = {
    clients: {
        modelClass: `${__dirname}/client.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: 'users.id',
            to: 'clients.userId',
        },
    },
    groups: {
        modelClass: `${__dirname}/group.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: 'users.id',
            to: 'groups.userId',
        },
    },
    permissions: {
        modelClass: `${__dirname}/permission.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: 'users.id',
            to: 'permissions.userId',
        },
    },
};
//# sourceMappingURL=user.model.js.map