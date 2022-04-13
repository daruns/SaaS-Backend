"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'taxes';
class TaxModel extends base_model_1.BaseModel {
}
exports.TaxModel = TaxModel;
TaxModel.tableName = tbName;
TaxModel.relationMappings = {
    expenses: {
        modelClass: `${__dirname}/expense.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'expenses.taxId',
        },
    },
};
exports.default = TaxModel;
//# sourceMappingURL=tax.model.js.map