"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaStudioUserModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'socialMediaStudioUsers';
class SocialMediaStudioUserModel extends base_model_1.BaseModel {
}
exports.SocialMediaStudioUserModel = SocialMediaStudioUserModel;
SocialMediaStudioUserModel.tableName = tbName;
SocialMediaStudioUserModel.relationMappings = {
    user: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.userId`,
            to: 'users.id',
        },
    },
    socialMediaStudio: {
        modelClass: `${__dirname}/socialMediaStudio.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.socialMediaStudioId`,
            to: 'socialMediaStudios.id',
        },
    },
};
exports.default = SocialMediaStudioUserModel;
//# sourceMappingURL=socialMediaStudioUser.model.js.map