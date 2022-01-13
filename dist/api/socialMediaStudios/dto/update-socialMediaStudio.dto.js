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
class UpdateSocialMediaStudioDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, status: { required: true, type: () => String }, stage: { required: true, type: () => String }, plannedStartDate: { required: true, type: () => Date }, plannedEndDate: { required: true, type: () => Date }, schedule: { required: true, type: () => Date }, priority: { required: true, type: () => String }, description: { required: true, type: () => String }, clientId: { required: true, type: () => Number }, users: { required: true, type: () => [Number] } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateSocialMediaStudioDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateSocialMediaStudioDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(['rejected', 'done', 'pending']),
    __metadata("design:type", String)
], UpdateSocialMediaStudioDto.prototype, "status", void 0);
__decorate([
    app_service_1.ToLower,
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(['production', 'review', 'complete']),
    __metadata("design:type", String)
], UpdateSocialMediaStudioDto.prototype, "stage", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], UpdateSocialMediaStudioDto.prototype, "plannedStartDate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], UpdateSocialMediaStudioDto.prototype, "plannedEndDate", void 0);
__decorate([
    class_validator_1.IsInt({ message: 'clientId must be integer' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateSocialMediaStudioDto.prototype, "clientId", void 0);
exports.UpdateSocialMediaStudioDto = UpdateSocialMediaStudioDto;
//# sourceMappingURL=update-socialMediaStudio.dto.js.map