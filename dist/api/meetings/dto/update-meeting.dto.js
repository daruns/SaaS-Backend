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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UpdateMeetingDto {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateMeetingDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsDate(),
    class_transformer_1.Type(() => Date),
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], UpdateMeetingDto.prototype, "date", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateMeetingDto.prototype, "duration", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateMeetingDto.prototype, "type", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateMeetingDto.prototype, "details", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateMeetingDto.prototype, "serviceRequirements", void 0);
__decorate([
    class_validator_1.IsDate(),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], UpdateMeetingDto.prototype, "nextMeetingDate", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateMeetingDto.prototype, "currentServiceProvider", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateMeetingDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsInt({ message: 'deleted must be integer' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateMeetingDto.prototype, "deleted", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateMeetingDto.prototype, "updatedBy", void 0);
__decorate([
    class_validator_1.IsInt({ message: 'clientId must be integer' }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateMeetingDto.prototype, "clientId", void 0);
exports.UpdateMeetingDto = UpdateMeetingDto;
//# sourceMappingURL=update-meeting.dto.js.map