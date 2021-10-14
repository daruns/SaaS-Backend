"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
class SocialMediaModel extends base_model_1.BaseModel {
}
exports.SocialMediaModel = SocialMediaModel;
SocialMediaModel.tableName = 'socialMedias';
SocialMediaModel.relationMappings = {
    client: {
        modelClass: `${__dirname}/client.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: 'socialMedias.clientId',
            to: 'clients.id',
        },
    },
};
//# sourceMappingURL=socialMedia.model.js.map