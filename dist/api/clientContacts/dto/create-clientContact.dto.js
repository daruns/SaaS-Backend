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
const app_service_1 = require("../../../app/app.service");
class CreateClientContactDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, businessPhoneNumber1: { required: true, type: () => String }, businessPhoneNumber2: { required: true, type: () => String }, email: { required: true, type: () => String }, position: { required: true, type: () => String }, description: { required: true, type: () => String }, department: { required: true, type: () => String }, status: { required: true, type: () => String }, clientId: { required: true, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Name is required' }),
    __metadata("design:type", String)
], CreateClientContactDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Matches(app_service_1.PhoneNumberRegex.reg),
    __metadata("design:type", String)
], CreateClientContactDto.prototype, "businessPhoneNumber1", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Matches(app_service_1.PhoneNumberRegex.reg),
    __metadata("design:type", String)
], CreateClientContactDto.prototype, "businessPhoneNumber2", void 0);
__decorate([
    class_validator_1.IsEmail({}, { message: 'Email address is invalid' }),
    __metadata("design:type", String)
], CreateClientContactDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsInt({ message: 'ClientId must be integer' }),
    __metadata("design:type", Number)
], CreateClientContactDto.prototype, "clientId", void 0);
exports.CreateClientContactDto = CreateClientContactDto;
//# sourceMappingURL=create-clientContact.dto.js.map