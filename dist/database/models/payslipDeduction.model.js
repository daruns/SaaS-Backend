"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayslipDeductionModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'payslipDeductions';
class PayslipDeductionModel extends base_model_1.BaseModel {
}
exports.PayslipDeductionModel = PayslipDeductionModel;
PayslipDeductionModel.tableName = tableName;
PayslipDeductionModel.relationMappings = {
    payslip: {
        modelClass: `${__dirname}/payslip.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.payslipId`,
            to: 'payslips.id',
        },
    },
};
exports.default = PayslipDeductionModel;
//# sourceMappingURL=payslipDeduction.model.js.map