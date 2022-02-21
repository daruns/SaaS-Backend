"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItemModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'invoiceItems';
class InvoiceItemModel extends base_model_1.BaseModel {
}
exports.InvoiceItemModel = InvoiceItemModel;
InvoiceItemModel.tableName = tableName;
InvoiceItemModel.relationMappings = {
    invoice: {
        modelClass: `${__dirname}/invoice.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.invoiceId.`,
            to: 'invoices.id',
        }
    },
};
exports.default = InvoiceItemModel;
//# sourceMappingURL=invoiceItem.model.js.map