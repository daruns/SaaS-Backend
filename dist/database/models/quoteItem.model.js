"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./base.model");
const objection_1 = require("objection");
const tableName = 'quoteItems';
class QuoteItemModel extends base_model_1.BaseModel {
}
exports.QuoteItemModel = QuoteItemModel;
QuoteItemModel.tableName = tableName;
QuoteItemModel.relationMappings = {
    quote: {
        modelClass: `${__dirname}/quote.model`,
        relation: objection_1.Model.BelongsToOneRelation,
        join: {
            from: `${tableName}.quoteId`,
            to: 'quotes.id',
        }
    },
};
exports.default = QuoteItemModel;
//# sourceMappingURL=quoteItem.model.js.map