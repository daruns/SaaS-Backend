"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OvertimeModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'overtimes';
class OvertimeModel extends base_model_1.BaseModel {
}
exports.OvertimeModel = OvertimeModel;
OvertimeModel.tableName = tableName;
OvertimeModel.relationMappings = {
    employee: {
        modelClass: `${__dirname}/employee.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.employeeId`,
            to: 'employees.id',
        },
    },
    overtimeType: {
        modelClass: `${__dirname}/overtimeType.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.overtimeTypeId`,
            to: 'overtimeTypes.id',
        },
    },
    overtimeApprovals: {
        modelClass: `${__dirname}/overtimeApproval.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'overtimeApprovals.overtimeId',
        },
    }
};
exports.default = OvertimeModel;
//# sourceMappingURL=overtime.model.js.map