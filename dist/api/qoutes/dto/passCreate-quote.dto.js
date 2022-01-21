"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassCreateQuoteItemDto = exports.PassCreateQuoteDto = void 0;
const openapi = require("@nestjs/swagger");
const create_quote_dto_1 = require("./create-quote.dto");
class PassCreateQuoteDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { quoteNumber: { required: true, type: () => String }, date: { required: true, type: () => Object }, dueDate: { required: true, type: () => Object }, brandCode: { required: true, type: () => String }, subTotalAmount: { required: true, type: () => Number }, createdBy: { required: true, type: () => String }, taxRate: { required: true, type: () => Number }, exchangeRate: { required: true, type: () => Number }, totalAmount: { required: true, type: () => Number }, discount: { required: true, type: () => Number } };
    }
}
exports.PassCreateQuoteDto = PassCreateQuoteDto;
class PassCreateQuoteItemDto extends create_quote_dto_1.CreateQuoteItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { quoteId: { required: true, type: () => Number }, name: { required: true, type: () => String }, category: { required: true, type: () => String }, description: { required: true, type: () => String }, billingAddress: { required: true, type: () => String }, paymentMethod: { required: true, type: () => String }, brandCode: { required: true, type: () => String }, itemId: { required: true, type: () => Number }, unitPrice: { required: true, type: () => Number }, qty: { required: true, type: () => Number }, purchasedAt: { required: true, type: () => Date }, expireDate: { required: true, type: () => Date }, supplier: { required: true, type: () => String } };
    }
}
exports.PassCreateQuoteItemDto = PassCreateQuoteItemDto;
//# sourceMappingURL=passCreate-quote.dto.js.map