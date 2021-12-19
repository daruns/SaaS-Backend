"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'brands';
class BrandModel extends base_model_1.BaseModel {
}
exports.BrandModel = BrandModel;
BrandModel.tableName = tableName;
BrandModel.relationMappings = {
    users: {
        modelClass: `${__dirname}/user.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.brandCode`,
            to: 'users.brandCode',
        },
    },
};
exports.default = BrandModel;
//# sourceMappingURL=brand.model.js.map