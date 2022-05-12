"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeductionModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'deductions';
class DeductionModel extends base_model_1.BaseModel {
}
exports.DeductionModel = DeductionModel;
DeductionModel.tableName = tableName;
DeductionModel.relationMappings = {
    employee: {
        modelClass: `${__dirname}/employee.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.employeeId`,
            to: 'employees.id',
        },
    },
    deductionType: {
        modelClass: `${__dirname}/deductionType.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.deductionTypeId`,
            to: 'deductionTypes.id',
        },
    },
};
exports.default = DeductionModel;
//# sourceMappingURL=deduction.model.js.map