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
class CreateBrandDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { brandCode: { required: true, type: () => String }, subdomain: { required: true, type: () => String }, name: { required: true, type: () => String }, logo: { required: true, type: () => String }, companySize: { required: true, type: () => Number }, address: { required: true, type: () => String }, announcedAt: { required: true, type: () => Date }, branches: { required: true, type: () => String }, occupation: { required: true, type: () => String }, website: { required: true, type: () => String }, phoneNumber: { required: true, type: () => String }, email: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Subdomain is required' }),
    __metadata("design:type", String)
], CreateBrandDto.prototype, "subdomain", void 0);
__decorate([
    class_validator_1.Matches(app_service_1.PhoneNumberRegex.reg),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateBrandDto.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsEmail({}, { message: 'Email address is invalid' }),
    class_validator_1.IsOptional({ message: 'Email is required' }),
    __metadata("design:type", String)
], CreateBrandDto.prototype, "email", void 0);
exports.CreateBrandDto = CreateBrandDto;
//# sourceMappingURL=create-brand.dto.js.map