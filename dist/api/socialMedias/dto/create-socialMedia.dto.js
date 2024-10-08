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
exports.CreateSocialMediaDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSocialMediaDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, linkAddress: { required: true, type: () => String }, addressDomain: { required: true, type: () => String }, status: { required: true, type: () => String }, deleted: { required: true, type: () => Number }, createdBy: { required: true, type: () => String }, clientId: { required: true, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Name is required' }),
    __metadata("design:type", String)
], CreateSocialMediaDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateSocialMediaDto.prototype, "linkAddress", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateSocialMediaDto.prototype, "deleted", void 0);
__decorate([
    class_validator_1.IsInt({ message: 'ClientId must be integer' }),
    __metadata("design:type", Number)
], CreateSocialMediaDto.prototype, "clientId", void 0);
exports.CreateSocialMediaDto = CreateSocialMediaDto;
//# sourceMappingURL=create-socialMedia.dto.js.map