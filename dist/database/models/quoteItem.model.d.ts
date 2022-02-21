import { BaseModel } from './base.model';
import { QuoteModel } from './quote.model';
export declare class QuoteItemModel extends BaseModel {
    static tableName: string;
    name: string;
    category: string;
    itemId: number;
    description: string;
    unitPrice: number;
    qty: number;
    purchasedAt: Date;
    expireDate: Date;
    supplier: string;
    brandCode: string;
    quoteId: number;
    quote: QuoteModel;
    static relationMappings: {
        quote: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default QuoteItemModel;
