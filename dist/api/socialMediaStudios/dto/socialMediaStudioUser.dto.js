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
exports.SocialMediaStudioUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const app_service_1 = require("../../../app/app.service");
class SocialMediaStudioUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, socialMediaStudioId: { required: true, type: () => Number }, canEdit: { required: true, type: () => Boolean }, approved: { required: true, type: () => Boolean } };
    }
}
__decorate([
    class_validator_1.IsOptional(),
    app_service_1.ToInteger,
    __metadata("design:type", Number)
], SocialMediaStudioUserDto.prototype, "id", void 0);
__decorate([
    app_service_1.ToInteger,
    __metadata("design:type", Number)
], SocialMediaStudioUserDto.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    app_service_1.ToInteger,
    __metadata("design:type", Number)
], SocialMediaStudioUserDto.prototype, "socialMediaStudioId", void 0);
__decorate([
    app_service_1.DefaultToFalse,
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], SocialMediaStudioUserDto.prototype, "canEdit", void 0);
__decorate([
    app_service_1.DefaultToFalse,
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], SocialMediaStudioUserDto.prototype, "approved", void 0);
exports.SocialMediaStudioUserDto = SocialMediaStudioUserDto;
//# sourceMappingURL=socialMediaStudioUser.dto.js.map