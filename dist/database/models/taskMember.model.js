"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMemberModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'taskMemberUsers';
class TaskMemberModel extends base_model_1.BaseModel {
}
exports.TaskMemberModel = TaskMemberModel;
TaskMemberModel.tableName = tbName;
TaskMemberModel.relationMappings = {
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.memberId`,
            to: 'users.id',
        },
    },
    task: {
        modelClass: `${__dirname}/task.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.taskId`,
            to: 'tasks.id',
        },
    },
};
exports.default = TaskMemberModel;
//# sourceMappingURL=taskMember.model.js.map