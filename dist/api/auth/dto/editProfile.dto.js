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
exports.EditProfileDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const app_service_1 = require("../../../app/app.service");
class EditProfileDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { password: { required: true, type: () => String }, phoneNumber: { required: true, type: () => String }, avatar: { required: true, type: () => Object }, name: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], EditProfileDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsOptional(),
    app_service_1.ToPhone,
    class_validator_1.IsOptional({ message: 'phoneNumber must be a valid number' }),
    __metadata("design:type", String)
], EditProfileDto.prototype, "phoneNumber", void 0);
exports.EditProfileDto = EditProfileDto;
//# sourceMappingURL=editProfile.dto.js.map