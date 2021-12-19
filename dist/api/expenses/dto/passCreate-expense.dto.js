"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openapi = require("@nestjs/swagger");
class PassCreateExpenseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { expenseNumber: { required: true, type: () => String }, date: { required: true, type: () => Object }, dueDate: { required: true, type: () => Object }, brandCode: { required: true, type: () => String }, subTotalAmount: { required: true, type: () => Number }, createdBy: { required: true, type: () => String }, taxRate: { required: true, type: () => Number }, exchangeRate: { required: true, type: () => Number }, totalAmount: { required: true, type: () => Number }, discount: { required: true, type: () => Number }, taxId: { required: true, type: () => Number }, paymentMethodId: { required: true, type: () => Number }, supplierId: { required: true, type: () => Number } };
    }
}
exports.PassCreateExpenseDto = PassCreateExpenseDto;
class PassCreateExpenseItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { expenseId: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, brandCode: { required: true, type: () => String }, unitPrice: { required: true, type: () => Number }, qty: { required: true, type: () => Number }, createdBy: { required: true, type: () => String } };
    }
}
exports.PassCreateExpenseItemDto = PassCreateExpenseItemDto;
//# sourceMappingURL=passCreate-expense.dto.js.map