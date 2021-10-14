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
class CreateMeetingDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Date is required' }),
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], CreateMeetingDto.prototype, "date", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateMeetingDto.prototype, "duration", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMeetingDto.prototype, "type", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMeetingDto.prototype, "details", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMeetingDto.prototype, "serviceRequirements", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], CreateMeetingDto.prototype, "nextMeetingDate", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMeetingDto.prototype, "currentServiceProvider", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMeetingDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateMeetingDto.prototype, "deleted", void 0);
__decorate([
    class_validator_1.IsInt({ message: 'ClientId must be integer' }),
    __metadata("design:type", Number)
], CreateMeetingDto.prototype, "clientId", void 0);
exports.CreateMeetingDto = CreateMeetingDto;
//# sourceMappingURL=create-meeting.dto.js.map