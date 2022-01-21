"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonInventoryItemModel = void 0;
const base_model_1 = require("./base.model");
const tbName = 'nonInventoryItems';
class NonInventoryItemModel extends base_model_1.BaseModel {
}
exports.NonInventoryItemModel = NonInventoryItemModel;
NonInventoryItemModel.tableName = tbName;
NonInventoryItemModel.relationMappings = {};
exports.default = NonInventoryItemModel;
//# sourceMappingURL=nonInventoryItem.model.js.map