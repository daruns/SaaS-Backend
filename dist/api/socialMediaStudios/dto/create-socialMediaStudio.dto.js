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
exports.CreateSocialMediaStudioDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const app_service_1 = require("../../../app/app.service");
class CreateSocialMediaStudioDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, plannedStartDate: { required: true, type: () => Date }, plannedEndDate: { required: true, type: () => Date }, schedule: { required: true, type: () => Date }, mineApproved: { required: true, type: () => Boolean }, clientApproval: { required: true, type: () => Boolean }, stage: { required: true, type: () => String }, priority: { required: true, type: () => String }, description: { required: true, type: () => String }, clientId: { required: true, type: () => Number }, users: { required: true, type: () => [require("./socialMediaStudioUser.dto").SocialMediaStudioUserDto] } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Name is required' }),
    __metadata("design:type", String)
], CreateSocialMediaStudioDto.prototype, "name", void 0);
__decorate([
    app_service_1.DefaultToNow,
    __metadata("design:type", Date)
], CreateSocialMediaStudioDto.prototype, "plannedStartDate", void 0);
__decorate([
    app_service_1.DefaultToNow,
    __metadata("design:type", Date)
], CreateSocialMediaStudioDto.prototype, "plannedEndDate", void 0);
__decorate([
    app_service_1.DefaultToNow,
    __metadata("design:type", Date)
], CreateSocialMediaStudioDto.prototype, "schedule", void 0);
__decorate([
    app_service_1.DefaultToFalse,
    __metadata("design:type", Boolean)
], CreateSocialMediaStudioDto.prototype, "mineApproved", void 0);
__decorate([
    app_service_1.DefaultToFalse,
    __metadata("design:type", Boolean)
], CreateSocialMediaStudioDto.prototype, "clientApproval", void 0);
__decorate([
    app_service_1.ToLower,
    class_validator_1.IsIn(['draft', 'production', 'review']),
    __metadata("design:type", String)
], CreateSocialMediaStudioDto.prototype, "stage", void 0);
__decorate([
    class_validator_1.IsInt({ message: 'ClientId must be integer' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateSocialMediaStudioDto.prototype, "clientId", void 0);
exports.CreateSocialMediaStudioDto = CreateSocialMediaStudioDto;
//# sourceMappingURL=create-socialMediaStudio.dto.js.map