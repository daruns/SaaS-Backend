"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'suppliers';
class SupplierModel extends base_model_1.BaseModel {
}
exports.SupplierModel = SupplierModel;
SupplierModel.tableName = tbName;
SupplierModel.relationMappings = {
    expenses: {
        modelClass: `${__dirname}/expense.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'expenses.supplierId',
        },
    },
};
exports.default = SupplierModel;
//# sourceMappingURL=supplier.model.js.map