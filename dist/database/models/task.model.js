"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'tasks';
class TaskModel extends base_model_1.BaseModel {
}
exports.TaskModel = TaskModel;
TaskModel.tableName = tableName;
TaskModel.relationMappings = {
    board: {
        modelClass: `${__dirname}/board.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.boardId`,
            to: 'projectBoards.id',
        },
    },
    project: {
        modelClass: `${__dirname}/project.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.projectId`,
            to: 'projects.id',
        },
    },
    members: {
        modelClass: `${__dirname}/taskMember.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'taskMemberUsers.taskId'
        },
    },
    attachments: {
        modelClass: `${__dirname}/attachment.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tableName}.id`,
            through: {
                from: 'taskAttachments.taskId',
                to: 'taskAttachments.attachmentId'
            },
            to: 'attachments.id',
        },
    },
    memberUsers: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tableName}.id`,
            through: {
                from: 'taskMemberUsers.taskId',
                to: 'taskMemberUsers.memberId'
            },
            to: 'users.id',
        },
    },
};
exports.default = TaskModel;
//# sourceMappingURL=task.model.js.map