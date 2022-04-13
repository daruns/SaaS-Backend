"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModel = void 0;
const objection_1 = require("objection");
const base_model_1 = require("./base.model");
const tableName = 'attendances';
class AttendanceModel extends base_model_1.BaseModel {
}
exports.AttendanceModel = AttendanceModel;
AttendanceModel.tableName = tableName;
AttendanceModel.relationMappings = {
    employee: {
        modelClass: `${__dirname}/employee.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.employeeId`,
            to: 'employees.id',
        },
    },
};
exports.default = AttendanceModel;
//# sourceMappingURL=attendance.model.js.map