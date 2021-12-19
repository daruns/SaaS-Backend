"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const tbName = 'inventoryItems';
class InventoryItemModel extends base_model_1.BaseModel {
}
exports.InventoryItemModel = InventoryItemModel;
InventoryItemModel.tableName = tbName;
InventoryItemModel.relationMappings = {};
exports.default = InventoryItemModel;
//# sourceMappingURL=inventoryItem.model.js.map