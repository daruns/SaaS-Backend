"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseSubCategoryModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'expenseSubCategories';
class ExpenseSubCategoryModel extends base_model_1.BaseModel {
}
exports.ExpenseSubCategoryModel = ExpenseSubCategoryModel;
ExpenseSubCategoryModel.tableName = tbName;
ExpenseSubCategoryModel.relationMappings = {
    expenseChildSubCategories: {
        modelClass: `${__dirname}/expenseChildSubCategory.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'expenseChildSubCategories.expenseSubCategoryId',
        },
    },
    expenseCategory: {
        modelClass: `${__dirname}/expenseCategory.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.expenseCategoryId`,
            to: 'expenseCategories.id',
        },
    },
};
exports.default = ExpenseSubCategoryModel;
//# sourceMappingURL=expenseSubCategory.model.js.map