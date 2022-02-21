"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectLeaderModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'projectLeaderUsers';
class ProjectLeaderModel extends base_model_1.BaseModel {
}
exports.ProjectLeaderModel = ProjectLeaderModel;
ProjectLeaderModel.tableName = tbName;
ProjectLeaderModel.relationMappings = {
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.leaerId`,
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
exports.default = ProjectLeaderModel;
//# sourceMappingURL=projectLeader.model.js.map