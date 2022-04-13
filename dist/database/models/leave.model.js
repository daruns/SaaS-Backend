"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'leaves';
class LeaveModel extends base_model_1.BaseModel {
}
exports.LeaveModel = LeaveModel;
LeaveModel.tableName = tableName;
LeaveModel.relationMappings = {
    employee: {
        modelClass: `${__dirname}/employee.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.employeeId`,
            to: 'employees.id',
        },
    },
    leaveType: {
        modelClass: `${__dirname}/leaveType.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.leaveTypeId`,
            to: 'leaveTypes.id',
        },
    },
    leaveApprovals: {
        modelClass: `${__dirname}/leaveApproval.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'leaveApprovals.leaveId',
        },
    }
};
exports.default = LeaveModel;
//# sourceMappingURL=leave.model.js.map