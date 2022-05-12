"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayslipEarningModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'payslipEarnings';
class PayslipEarningModel extends base_model_1.BaseModel {
}
exports.PayslipEarningModel = PayslipEarningModel;
PayslipEarningModel.tableName = tableName;
PayslipEarningModel.relationMappings = {
    payslip: {
        modelClass: `${__dirname}/payslip.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.payslipId`,
            to: 'payslips.id',
        },
    },
};
exports.default = PayslipEarningModel;
//# sourceMappingURL=payslipEarning.model.js.map