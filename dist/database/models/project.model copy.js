"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'projects';
class ProjectModel extends base_model_1.BaseModel {
}
exports.ProjectModel = ProjectModel;
ProjectModel.tableName = tableName;
ProjectModel.relationMappings = {
    client: {
        modelClass: `${__dirname}/client.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.clientId`,
            to: 'clients.id',
        },
    },
    leaders: {
        modelClass: `${__dirname}/projectLeader.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'projectLeaderUsers.projectId',
        },
    },
    members: {
        modelClass: `${__dirname}/projectMember.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'projectMemberUsers.projectId'
        },
    },
    leaderUsers: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tableName}.id`,
            through: {
                from: 'projectLeaderUsers.projectId',
                to: 'projectLeaderUsers.leaderId'
            },
            to: 'users.id',
        },
    },
    memberUsers: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tableName}.id`,
            through: {
                from: 'projectMemberUsers.projectId',
                to: 'projectMemberUsers.memberId'
            },
            to: 'users.id',
        },
    },
    tasks: {
        modelClass: `${__dirname}/task.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'tasks.projectId',
        },
    },
    projectAttachments: {
        modelClass: `${__dirname}/projectAttachment.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'projectAttachments.projectId',
        },
    },
    attachments: {
        modelClass: `${__dirname}/attachment.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tableName}.id`,
            through: {
                from: 'projectAttachments.projectId',
                to: 'projectAttachments.attachmentId'
            },
            to: 'attachments.id',
        },
    },
};
exports.default = ProjectModel;
//# sourceMappingURL=project.model copy.js.map