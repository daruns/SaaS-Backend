"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassCreateInvoiceItemDto = exports.PassCreateInvoiceDto = void 0;
const openapi = require("@nestjs/swagger");
const create_invoice_dto_1 = require("./create-invoice.dto");
class PassCreateInvoiceDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { invoiceNumber: { required: true, type: () => String }, date: { required: true, type: () => Object }, dueDate: { required: true, type: () => Object }, clientId: { required: true, type: () => Number }, clientContactId: { required: true, type: () => Number }, brandCode: { required: true, type: () => String }, paymentMethodId: { required: true, type: () => Number }, taxId: { required: true, type: () => Number }, subTotalAmount: { required: true, type: () => Number }, createdBy: { required: true, type: () => String }, taxRate: { required: true, type: () => Number }, exchangeRate: { required: true, type: () => Number }, totalAmount: { required: true, type: () => Number }, bankFee: { required: true, type: () => Number }, discount: { required: true, type: () => Number }, currencyCode: { required: true, type: () => String } };
    }
}
exports.PassCreateInvoiceDto = PassCreateInvoiceDto;
class PassCreateInvoiceItemDto extends create_invoice_dto_1.CreateInvoiceItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { invoiceId: { required: true, type: () => Number }, name: { required: true, type: () => String }, category: { required: true, type: () => String }, description: { required: true, type: () => String }, billingAddress: { required: true, type: () => String }, brandCode: { required: true, type: () => String }, itemId: { required: true, type: () => Number }, unitPrice: { required: true, type: () => Number }, qty: { required: true, type: () => Number }, purchasedAt: { required: true, type: () => Date }, expireDate: { required: true, type: () => Date }, supplier: { required: true, type: () => String } };
    }
}
exports.PassCreateInvoiceItemDto = PassCreateInvoiceItemDto;
//# sourceMappingURL=passCreate-invoice.dto.js.map