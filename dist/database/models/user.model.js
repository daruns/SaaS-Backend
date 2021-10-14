"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const class_transformer_1 = require("class-transformer");
class UserModel extends base_model_1.BaseModel {
}
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
__decorate([
    class_transformer_1.Exclude({ toPlainOnly: true }),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map