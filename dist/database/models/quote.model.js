"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'quotes';
class QuoteModel extends base_model_1.BaseModel {
}
exports.QuoteModel = QuoteModel;
QuoteModel.tableName = tableName;
QuoteModel.relationMappings = {
    quoteItems: {
        modelClass: `${__dirname}/quoteItem.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'quoteItems.quoteId',
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
exports.default = QuoteModel;
//# sourceMappingURL=quote.model.js.map