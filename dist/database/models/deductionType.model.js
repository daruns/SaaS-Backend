"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeductionTypeModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'deductionTypes';
class DeductionTypeModel extends base_model_1.BaseModel {
}
exports.DeductionTypeModel = DeductionTypeModel;
DeductionTypeModel.tableName = tableName;
DeductionTypeModel.relationMappings = {
    deductions: {
        modelClass: `${__dirname}/deduction.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'deductions.deductionTypeId',
        },
    },
};
exports.default = DeductionTypeModel;
//# sourceMappingURL=deductionType.model.js.map