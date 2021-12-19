"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateExpenseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { date: { required: true, type: () => Date }, dueDate: { required: true, type: () => Date }, billingAddress: { required: true, type: () => String }, description: { required: true, type: () => String }, category: { required: true, type: () => String }, discount: { required: true, type: () => Number }, currencyCode: { required: true, type: () => String }, paymentMethodId: { required: true, type: () => Number }, taxId: { required: true, type: () => Number }, supplierId: { required: true, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], CreateExpenseDto.prototype, "date", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], CreateExpenseDto.prototype, "dueDate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "category", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "discount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "currencyCode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "paymentMethodId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "taxId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "supplierId", void 0);
exports.CreateExpenseDto = CreateExpenseDto;
class CreateExpenseItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { expenseId: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, brandCode: { required: true, type: () => String }, itemId: { required: true, type: () => Number }, category: { required: true, type: () => Boolean }, unitPrice: { required: true, type: () => Number }, qty: { required: true, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateExpenseItemDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateExpenseItemDto.prototype, "unitPrice", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateExpenseItemDto.prototype, "qty", void 0);
exports.CreateExpenseItemDto = CreateExpenseItemDto;
//# sourceMappingURL=create-expense.dto.js.map