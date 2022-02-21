"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'clients';
class ClientModel extends base_model_1.BaseModel {
}
exports.ClientModel = ClientModel;
ClientModel.tableName = tableName;
ClientModel.relationMappings = {
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.userId`,
            to: 'users.id',
        },
    },
    clientContacts: {
        modelClass: `${__dirname}/clientContact.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'clientContacts.clientId',
        },
    },
    meetings: {
        modelClass: `${__dirname}/meeting.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'meetings.clientId',
        },
    },
    socialMedias: {
        modelClass: `${__dirname}/socialMedia.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'socialMedias.clientId',
        },
    },
    invoices: {
        modelClass: `${__dirname}/invoice.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'invoices.clientId',
        },
    },
    quotes: {
        modelClass: `${__dirname}/quote.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'quotes.clientId',
        },
    },
    projects: {
        modelClass: `${__dirname}/project.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'projects.clientId',
        },
    },
};
exports.default = ClientModel;
//# sourceMappingURL=client.model.js.map