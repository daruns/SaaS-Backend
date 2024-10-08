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
exports.UpdateSocialMediaDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateSocialMediaDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, linkAddress: { required: true, type: () => String }, addressDomain: { required: true, type: () => String }, status: { required: true, type: () => String }, deleted: { required: true, type: () => Number }, updatedBy: { required: true, type: () => String }, clientId: { required: true, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateSocialMediaDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateSocialMediaDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateSocialMediaDto.prototype, "linkAddress", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateSocialMediaDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsInt({ message: 'deleted must be integer' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateSocialMediaDto.prototype, "deleted", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateSocialMediaDto.prototype, "updatedBy", void 0);
__decorate([
    class_validator_1.IsInt({ message: 'clientId must be integer' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateSocialMediaDto.prototype, "clientId", void 0);
exports.UpdateSocialMediaDto = UpdateSocialMediaDto;
//# sourceMappingURL=update-socialMedia.dto.js.map