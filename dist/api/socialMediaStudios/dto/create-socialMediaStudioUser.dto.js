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
class CreateSocialMediaStudioUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number }, socialMediaStudioId: { required: true, type: () => Number }, canEdit: { required: true, type: () => Boolean }, approved: { required: true, type: () => Boolean }, createdBy: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateSocialMediaStudioUserDto.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateSocialMediaStudioUserDto.prototype, "socialMediaStudioId", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateSocialMediaStudioUserDto.prototype, "canEdit", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateSocialMediaStudioUserDto.prototype, "approved", void 0);
exports.CreateSocialMediaStudioUserDto = CreateSocialMediaStudioUserDto;
//# sourceMappingURL=create-socialMediaStudioUser.dto.js.map