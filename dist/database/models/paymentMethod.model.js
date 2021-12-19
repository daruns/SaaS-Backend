"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'paymentMethods';
class PaymentMethodModel extends base_model_1.BaseModel {
}
exports.PaymentMethodModel = PaymentMethodModel;
PaymentMethodModel.tableName = tbName;
PaymentMethodModel.relationMappings = {
    expenses: {
        modelClass: `${__dirname}/expense.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'expenses.paymentMethodId',
        },
    },
};
exports.default = PaymentMethodModel;
//# sourceMappingURL=paymentMethod.model.js.map