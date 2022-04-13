"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceItemModel = void 0;
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'serviceItems';
class ServiceItemModel extends base_model_1.BaseModel {
}
exports.ServiceItemModel = ServiceItemModel;
ServiceItemModel.tableName = tbName;
ServiceItemModel.relationMappings = {
    subServiceItems: {
        modelClass: `${__dirname}/subServiceItem.model`,
        relation: objection_1.Model.HasManyRelation,
        join: {
            from: `${tbName}.id`,
            to: 'subServiceItems.serviceItemId',
        },
    },
};
exports.default = ServiceItemModel;
//# sourceMappingURL=serviceItem.model.js.map