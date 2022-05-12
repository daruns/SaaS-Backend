"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayslipModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'payslips';
class PayslipModel extends base_model_1.BaseModel {
}
exports.PayslipModel = PayslipModel;
PayslipModel.tableName = tableName;
PayslipModel.relationMappings = {
    employee: {
        modelClass: `${__dirname}/employee.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.employeeId`,
            to: 'employees.id',
        },
    },
    payslipEarnings: {
        modelClass: `${__dirname}/payslipEarning.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'payslipEarnings.payslipId',
        },
    },
    payslipDeductions: {
        modelClass: `${__dirname}/payslipDeduction.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'payslipDeductions.payslipId',
        },
    },
};
exports.default = PayslipModel;
//# sourceMappingURL=payslip.model.js.map