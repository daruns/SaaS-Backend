"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarningTypeModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'earningTypes';
class EarningTypeModel extends base_model_1.BaseModel {
}
exports.EarningTypeModel = EarningTypeModel;
EarningTypeModel.tableName = tableName;
EarningTypeModel.relationMappings = {
    earnings: {
        modelClass: `${__dirname}/earning.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tableName}.id`,
            to: 'earnings.earningTypeId',
        },
    },
};
exports.default = EarningTypeModel;
//# sourceMappingURL=earningType.model.js.map