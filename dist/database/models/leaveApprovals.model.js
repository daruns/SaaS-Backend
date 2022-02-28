"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMemberModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'leaveApprovals';
class TaskMemberModel extends base_model_1.BaseModel {
}
exports.TaskMemberModel = TaskMemberModel;
TaskMemberModel.tableName = tbName;
TaskMemberModel.relationMappings = {
    leave: {
        modelClass: `${__dirname}/leave.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.leaveId`,
            to: 'leaves.id',
        },
    },
    manager: {
        modelClass: `${__dirname}/employee.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.managerId`,
            to: 'employees.id',
        },
    },
};
exports.default = TaskMemberModel;
//# sourceMappingURL=leaveApprovals.model.js.map