"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
class ClientModel extends base_model_1.BaseModel {
}
exports.ClientModel = ClientModel;
ClientModel.tableName = 'clients';
ClientModel.relationMappings = {
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: 'clients.userId',
            to: 'users.id',
        },
    },
    clientContacts: {
        modelClass: `${__dirname}/clientContact.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: 'clients.id',
            to: 'clientContacts.clientId',
        },
    },
    meetings: {
        modelClass: `${__dirname}/meeting.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: 'clients.id',
            to: 'meetings.clientId',
        },
    },
    socialMedias: {
        modelClass: `${__dirname}/socialMedia.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: 'clients.id',
            to: 'socialMedias.clientId',
        },
    },
};
//# sourceMappingURL=client.model.js.map