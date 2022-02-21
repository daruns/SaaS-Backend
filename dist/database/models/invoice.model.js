"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'invoices';
class InvoiceModel extends base_model_1.BaseModel {
}
exports.InvoiceModel = InvoiceModel;
InvoiceModel.tableName = tableName;
InvoiceModel.relationMappings = {
    invoiceItems: {
        modelClass: `${__dirname}/invoiceItem.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'invoiceItems.invoiceId',
        },
    },
    clientContact: {
        modelClass: `${__dirname}/clientContact.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.clientContactId`,
            to: 'clientContacts.id',
        }
    },
    client: {
        modelClass: `${__dirname}/client.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.clientId`,
            to: 'clients.id',
        },
    },
};
exports.default = InvoiceModel;
//# sourceMappingURL=invoice.model.js.map