"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tbName = 'subServiceItems';
class SubServiceItemModel extends base_model_1.BaseModel {
}
exports.SubServiceItemModel = SubServiceItemModel;
SubServiceItemModel.tableName = tbName;
SubServiceItemModel.relationMappings = {
    serviceItem: {
        modelClass: `${__dirname}/serviceItem.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tbName}.serviceItemId`,
            to: 'serviceItems.id',
        },
    },
};
exports.default = SubServiceItemModel;
//# sourceMappingURL=subServiceItem.model.js.map