"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'projectMemberUsers';
class ProjectMemberModel extends base_model_1.BaseModel {
}
exports.ProjectMemberModel = ProjectMemberModel;
ProjectMemberModel.tableName = tbName;
ProjectMemberModel.relationMappings = {
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.memberId`,
            to: 'users.id',
        },
    },
    project: {
        modelClass: `${__dirname}/project.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.projectId`,
            to: 'projects.id',
        },
    },
};
exports.default = ProjectMemberModel;
//# sourceMappingURL=projectMember.model.js.map