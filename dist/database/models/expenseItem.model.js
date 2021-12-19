"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'expenseItems';
class ExpenseItemModel extends base_model_1.BaseModel {
}
exports.ExpenseItemModel = ExpenseItemModel;
ExpenseItemModel.tableName = tableName;
ExpenseItemModel.relationMappings = {
    expense: {
        modelClass: `${__dirname}/expense.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.expenseId.`,
            to: 'expenses.id',
        }
    },
};
exports.default = ExpenseItemModel;
//# sourceMappingURL=expenseItem.model.js.map