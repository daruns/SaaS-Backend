"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'socialMedias';
class SocialMediaModel extends base_model_1.BaseModel {
}
exports.SocialMediaModel = SocialMediaModel;
SocialMediaModel.tableName = tableName;
SocialMediaModel.relationMappings = {
    client: {
        modelClass: `${__dirname}/client.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.clientId`,
            to: 'clients.id',
        },
    },
};
exports.default = SocialMediaModel;
//# sourceMappingURL=socialMedia.model.js.map