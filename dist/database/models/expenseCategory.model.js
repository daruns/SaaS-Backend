"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'expenseCategories';
class ExpenseCategoryModel extends base_model_1.BaseModel {
}
exports.ExpenseCategoryModel = ExpenseCategoryModel;
ExpenseCategoryModel.tableName = tbName;
ExpenseCategoryModel.relationMappings = {
    expenseSubCategories: {
        modelClass: `${__dirname}/expenseSubCategory.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'expenseSubCategories.expenseCategoryId',
        },
    },
};
exports.default = ExpenseCategoryModel;
//# sourceMappingURL=expenseCategory.model.js.map