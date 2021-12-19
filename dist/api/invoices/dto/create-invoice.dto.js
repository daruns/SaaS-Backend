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
class CreateInvoiceDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { date: { required: true, type: () => Date }, dueDate: { required: true, type: () => Date }, billingAddress: { required: true, type: () => String }, description: { required: true, type: () => String }, paymentMethod: { required: true, type: () => String }, discount: { required: true, type: () => Number }, taxRate: { required: true, type: () => Number }, exchangeRate: { required: true, type: () => Number }, currencyCode: { required: true, type: () => String }, clientContactId: { required: true, type: () => Number }, clientId: { required: true, type: () => Number }, status: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], CreateInvoiceDto.prototype, "date", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], CreateInvoiceDto.prototype, "dueDate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "discount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "taxRate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "exchangeRate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "currencyCode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateInvoiceDto.prototype, "clientId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "status", void 0);
exports.CreateInvoiceDto = CreateInvoiceDto;
class CreateInvoiceItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { invoiceId: { required: true, type: () => Number }, name: { required: true, type: () => String }, category: { required: true, type: () => String }, description: { required: true, type: () => String }, brandCode: { required: true, type: () => String }, itemId: { required: true, type: () => Number }, unitPrice: { required: true, type: () => Number }, qty: { required: true, type: () => Number }, purchasedAt: { required: true, type: () => Date }, expireDate: { required: true, type: () => Date }, supplier: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateInvoiceItemDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateInvoiceItemDto.prototype, "category", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "itemId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "unitPrice", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateInvoiceItemDto.prototype, "qty", void 0);
__decorate([
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], CreateInvoiceItemDto.prototype, "purchasedAt", void 0);
__decorate([
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], CreateInvoiceItemDto.prototype, "expireDate", void 0);
exports.CreateInvoiceItemDto = CreateInvoiceItemDto;
//# sourceMappingURL=create-invoice.dto.js.map