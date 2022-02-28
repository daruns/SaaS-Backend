"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'employees';
class EmployeeModel extends base_model_1.BaseModel {
}
exports.EmployeeModel = EmployeeModel;
EmployeeModel.tableName = tableName;
EmployeeModel.relationMappings = {
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.userId`,
            to: 'users.id',
        },
    },
    designation: {
        modelClass: `${__dirname}/designation.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.designationId`,
            to: 'designations.id',
        },
    },
    department: {
        modelClass: `${__dirname}/department.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.departmentId`,
            to: 'departments.id',
        },
    },
    manager: {
        modelClass: `${__dirname}/employee.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.managerId`,
            to: 'employees.id',
        },
    },
};
exports.default = EmployeeModel;
//# sourceMappingURL=employee.model copy.js.map