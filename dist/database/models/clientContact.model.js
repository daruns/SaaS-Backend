"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
class ClientContactModel extends base_model_1.BaseModel {
}
exports.ClientContactModel = ClientContactModel;
ClientContactModel.tableName = 'clientContacts';
ClientContactModel.relationMappings = {
    client: {
        modelClass: `${__dirname}/client.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: 'clientContacts.clientId',
            to: 'clients.id',
        },
    },
};
//# sourceMappingURL=clientContact.model.js.map