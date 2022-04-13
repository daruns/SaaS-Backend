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
    constructor() {
        this.userType = "agent";
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, logo: { required: true, type: () => Object }, departmentId: { required: true, type: () => Number }, designationId: { required: true, type: () => Number }, managerId: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, avatar: { required: true, type: () => String }, username: { required: true, type: () => String, minLength: 3, maxLength: 30 }, zipCode: { required: true, type: () => String }, address: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8, maxLength: 30 }, userType: { required: true, type: () => String, default: "agent" }, phoneNumber: { required: true, type: () => String }, createdBy: { required: true, type: () => String }, reportsTo: { required: true, type: () => String }, brandCode: { required: true, type: () => String }, status: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateClientDto.prototype, "departmentId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateClientDto.prototype, "designationId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateClientDto.prototype, "managerId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateClientDto.prototype, "userId", void 0);
__decorate([
    class_validator_1.MinLength(3, { message: 'username must more than 3 chars' }),
    class_validator_1.MaxLength(30, { message: 'username is too long. only 30 chars allowed.' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEmail({}),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "email", void 0);
__decorate([
    class_validator_1.MinLength(8, { message: 'Password must have 8 chars' }),
    class_validator_1.MaxLength(30, { message: 'Password is too long. only 30 chars allow.' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "password", void 0);
__decorate([
    app_service_1.ToPhone,
    class_validator_1.IsString({ message: "must be a valid phonenumber" }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "phoneNumber", void 0);
exports.CreateClientDto = CreateClientDto;
//# sourceMappingURL=create-client.dto.js.map