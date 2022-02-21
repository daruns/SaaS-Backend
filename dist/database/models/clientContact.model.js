"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientContactModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'clientContacts';
class ClientContactModel extends base_model_1.BaseModel {
}
exports.ClientContactModel = ClientContactModel;
ClientContactModel.tableName = tableName;
ClientContactModel.relationMappings = {
    client: {
        modelClass: `${__dirname}/client.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.clientId`,
            to: 'clients.id',
        },
    },
    invoices: {
        modelClass: `${__dirname}/invoice.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'invoices.clientContactid',
        },
    },
};
exports.default = ClientContactModel;
//# sourceMappingURL=clientContact.model.js.map