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
const tbName = 'users';
class UserModel extends base_model_1.BaseModel {
}
UserModel.tableName = tbName;
UserModel.relationMappings = {
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.userId`,
            to: `${tbName}.id`,
        },
    },
    users: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: `${tbName}.userId`,
        },
    },
    brand: {
        modelClass: `${__dirname}/brand.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.brandCode`,
            to: 'brands.brandCode',
        },
    },
    clients: {
        modelClass: `${__dirname}/client.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'clients.userId',
        },
    },
    roles: {
        modelClass: `${__dirname}/role.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tbName}.id`,
            through: {
                from: 'userRoles.userId',
                to: 'userRoles.roleId'
            },
            to: 'roles.id',
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
            to: 'permissions.userId',
        },
    },
    projectLeaders: {
        modelClass: `${__dirname}/projectLeader.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'projectLeaderUsers.leaderId',
        },
    },
    projectMembers: {
        modelClass: `${__dirname}/projectMember.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'projectMemberUsers.memberId'
        },
    },
    projectsMemberUsers: {
        modelClass: `${__dirname}/project.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tbName}.id`,
            through: {
                from: `projectMemberUsers.memberId`,
                to: `projectMemberUsers.projectId`,
            },
            to: 'projects.id'
        },
    },
    projectsLeaderUsers: {
        modelClass: `${__dirname}/project.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tbName}.id`,
            through: {
                from: `projectLeaderUsers.leaderId`,
                to: `projectLeaderUsers.projectId`,
            },
            to: 'projects.id'
        },
    },
    boardAttribute: {
        modelClass: `${__dirname}/boardAttribute.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'boardAttributes.userId',
        },
    },
    boards: {
        modelClass: `${__dirname}/board.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'boards.userId',
        },
    },
    taskMembers: {
        modelClass: `${__dirname}/taskMember.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'taskMemberUsers.memberId'
        },
    },
    tasksMemberUsers: {
        modelClass: `${__dirname}/task.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tbName}.id`,
            through: {
                from: `taskMemberUsers.memberId`,
                to: `taskMemberUsers.taskId`,
            },
            to: 'tasks.id'
        },
    },
};
__decorate([
    class_transformer_1.Exclude({ toPlainOnly: true }),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
exports.UserModel = UserModel;
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map