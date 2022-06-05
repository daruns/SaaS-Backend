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
exports.UpdateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_layers_dto_1 = require("../../../dto/user-layers.dto");
const app_service_1 = require("../../../../../app/app.service");
class UpdateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, username: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8, maxLength: 30 }, phoneNumber: { required: true, type: () => String }, userType: { required: true, type: () => String }, avatar: { required: true, type: () => Object }, userId: { required: true, type: () => Number }, department: { required: true, type: () => String }, reportsTo: { required: true, type: () => String }, activationToken: { required: true, type: () => String }, activationTokenExpire: { required: true, type: () => Date }, activatedAt: { required: true, type: () => Date }, passwordResetToken: { required: true, type: () => String }, passwordResetTokenExpire: { required: true, type: () => Date }, lastResetAt: { required: true, type: () => Date }, brandCode: { required: true, type: () => String }, status: { required: true, type: () => String }, deleted: { required: true, type: () => Number }, permissions: { required: true } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail({}, { message: 'Email address is invalid' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(8, { message: 'Password must have 8 chars' }),
    class_validator_1.MaxLength(30, { message: 'Password is too long. only 30 chars allow.' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsOptional(),
    app_service_1.ToPhone,
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(Object.values(user_layers_dto_1.UserLayers)),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "userType", void 0);
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map