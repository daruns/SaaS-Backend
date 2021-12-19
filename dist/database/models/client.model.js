"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
};
exports.default = ClientModel;
//# sourceMappingURL=client.model.js.map