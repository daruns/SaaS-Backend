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
exports.CreateClientDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const app_service_1 = require("../../../app/app.service");
class CreateClientDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, logo: { required: true, type: () => Object }, phoneNumbers: { required: true, type: () => String }, clientType: { required: true, type: () => String }, businessType: { required: true, type: () => String }, email: { required: true, type: () => String }, website: { required: true, type: () => String }, address: { required: true, type: () => String }, rate: { required: true, type: () => Number, minimum: 0, maximum: 10 }, zipCode: { required: true, type: () => String }, status: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    app_service_1.ToPhone,
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "phoneNumbers", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "clientType", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "businessType", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsEmail({}),
    __metadata("design:type", String)
], CreateClientDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "website", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "address", void 0);
__decorate([
    app_service_1.ToRate,
    class_validator_1.Min(0),
    class_validator_1.Max(10),
    __metadata("design:type", Number)
], CreateClientDto.prototype, "rate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "zipCode", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "status", void 0);
exports.CreateClientDto = CreateClientDto;
//# sourceMappingURL=create-client.dto.js.map