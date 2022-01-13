"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const socialMedia_model_1 = require("./socialMedia.model");
const objection_1 = require("objection");
const tbName = 'socialMediaUsers';
class SocialMediaUserModel extends base_model_1.BaseModel {
}
exports.SocialMediaUserModel = SocialMediaUserModel;
SocialMediaUserModel.tableName = tbName;
SocialMediaUserModel.relationMappings = {
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.userId`,
            to: 'users.id',
        },
    },
    socialMedia: {
        modelClass: `${__dirname}/socialMedia.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.socialMediaId`,
            to: 'socialMedias.id',
        },
    },
};
exports.default = socialMedia_model_1.SocialMediaModel;
//# sourceMappingURL=socialMediaUser.model.js.map