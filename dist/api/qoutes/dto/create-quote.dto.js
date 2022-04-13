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
exports.CreateQuoteItemDto = exports.CreateQuoteDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const app_service_1 = require("../../../app/app.service");
const defaults_1 = require("../../../lib/defaults");
class CreateQuoteDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { date: { required: true, type: () => Date }, dueDate: { required: true, type: () => Date }, billingAddress: { required: true, type: () => String }, description: { required: true, type: () => String }, paymentMethodId: { required: true, type: () => Number }, taxId: { required: true, type: () => Number }, discount: { required: true, type: () => Number }, taxRate: { required: true, type: () => Number }, bankFee: { required: true, type: () => Number }, exchangeRate: { required: true, type: () => Number }, currencyCode: { required: true, type: () => String }, clientContactId: { required: true, type: () => Number }, clientId: { required: true, type: () => Number }, status: { required: true, type: () => String } };
    }
}
__decorate([
    app_service_1.DefaultToNow,
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], CreateQuoteDto.prototype, "date", void 0);
__decorate([
    app_service_1.DefaultToNow,
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], CreateQuoteDto.prototype, "dueDate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateQuoteDto.prototype, "discount", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateQuoteDto.prototype, "taxRate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateQuoteDto.prototype, "exchangeRate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn(defaults_1.CURRENCY_CODES),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "currencyCode", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateQuoteDto.prototype, "clientId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateQuoteDto.prototype, "status", void 0);
exports.CreateQuoteDto = CreateQuoteDto;
class CreateQuoteItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { quoteId: { required: true, type: () => Number }, name: { required: true, type: () => String }, category: { required: true, type: () => String }, description: { required: true, type: () => String }, brandCode: { required: true, type: () => String }, itemId: { required: true, type: () => Number }, unitPrice: { required: true, type: () => Number }, qty: { required: true, type: () => Number }, purchasedAt: { required: true, type: () => Date }, expireDate: { required: true, type: () => Date }, supplier: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateQuoteItemDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateQuoteItemDto.prototype, "category", void 0);
__decorate([
    app_service_1.DefaultTo(0),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateQuoteItemDto.prototype, "unitPrice", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateQuoteItemDto.prototype, "qty", void 0);
__decorate([
    app_service_1.DefaultToEmpty,
    __metadata("design:type", Date)
], CreateQuoteItemDto.prototype, "purchasedAt", void 0);
__decorate([
    app_service_1.DefaultToEmpty,
    __metadata("design:type", Date)
], CreateQuoteItemDto.prototype, "expireDate", void 0);
exports.CreateQuoteItemDto = CreateQuoteItemDto;
//# sourceMappingURL=create-quote.dto.js.map