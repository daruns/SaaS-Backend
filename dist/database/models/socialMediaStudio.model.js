"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'socialMediaStudios';
class SocialMediaStudioModel extends base_model_1.BaseModel {
}
exports.SocialMediaStudioModel = SocialMediaStudioModel;
SocialMediaStudioModel.tableName = tableName;
SocialMediaStudioModel.relationMappings = {
    medias: {
        modelClass: `${__dirname}/media.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'medias.id'
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
    socialMediaStudioUsers: {
        modelClass: `${__dirname}/socialMediaStudioUser.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'socialMediaStudioUsers.socialMediaStudioId',
        }
    },
    users: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.ManyToManyRelation,
        join: {
            from: `${tableName}.id`,
            through: {
                from: 'socialMediaStudioUsers.socialMediaStudioId',
                to: 'socialMediaStudioUsers.userId'
            },
            to: 'users.id'
        }
    }
};
exports.default = SocialMediaStudioModel;
//# sourceMappingURL=socialMediaStudio.model.js.map