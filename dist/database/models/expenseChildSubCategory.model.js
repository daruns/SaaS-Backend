"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseChildSubCategoryModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'expenseChildSubCategories';
class ExpenseChildSubCategoryModel extends base_model_1.BaseModel {
}
exports.ExpenseChildSubCategoryModel = ExpenseChildSubCategoryModel;
ExpenseChildSubCategoryModel.tableName = tbName;
ExpenseChildSubCategoryModel.relationMappings = {
    expenseSubCategory: {
        modelClass: `${__dirname}/expenseSubCategory.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.expenseSubCategoryId`,
            to: 'expenseCategories.id',
        },
    },
};
exports.default = ExpenseChildSubCategoryModel;
//# sourceMappingURL=expenseChildSubCategory.model.js.map