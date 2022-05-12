"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OvertimeApprovalModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'overtimeApprovals';
class OvertimeApprovalModel extends base_model_1.BaseModel {
}
exports.OvertimeApprovalModel = OvertimeApprovalModel;
OvertimeApprovalModel.tableName = tbName;
OvertimeApprovalModel.relationMappings = {
    overtime: {
        modelClass: `${__dirname}/overtime.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.overtimeId`,
            to: 'overtimes.id',
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
exports.default = OvertimeApprovalModel;
//# sourceMappingURL=overtimeApproval.model.js.map