"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'expenses';
class ExpenseModel extends base_model_1.BaseModel {
}
exports.ExpenseModel = ExpenseModel;
ExpenseModel.tableName = tableName;
ExpenseModel.relationMappings = {
    expenseItems: {
        modelClass: `${__dirname}/expenseItem.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'expenseItems.expenseId',
        },
    },
    supplier: {
        modelClass: `${__dirname}/supplier.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.supplierId`,
            to: 'suppliers.id',
        },
    },
    tax: {
        modelClass: `${__dirname}/tax.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.taxId`,
            to: 'taxes.id',
        },
    },
    paymentMethod: {
        modelClass: `${__dirname}/paymentMethod.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.paymentMethodId`,
            to: 'paymentMethods.id',
        },
    },
    attachments: {
        modelClass: `${__dirname}/attachment.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tableName}.id`,
            through: {
                from: 'expenseAttachments.expenseId',
                to: 'expenseAttachments.attachmentId'
            },
            to: 'attachments.id',
        },
    },
    expenseAttachments: {
        modelClass: `${__dirname}/expenseAttachment.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'expenseAttachments.expenseId',
        },
    },
};
exports.default = ExpenseModel;
//# sourceMappingURL=expense.model.js.map