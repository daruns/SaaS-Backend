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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_layers_dto_1 = require("../../../dto/user-layers.dto");
const app_service_1 = require("../../../../../app/app.service");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String }, username: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8, maxLength: 30 }, phoneNumber: { required: true, type: () => String }, userType: { required: true, type: () => String }, avatar: { required: true, type: () => Object }, department: { required: true, type: () => String }, reportsTo: { required: true, type: () => String }, brandCode: { required: true, type: () => String }, permissions: { required: true } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Email is required' }),
    class_validator_1.IsEmail({}, { message: 'Email address is invalid' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Username is required' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Password is required' }),
    class_validator_1.MinLength(8, { message: 'Password must have 8 chars' }),
    class_validator_1.MaxLength(30, { message: 'Password is too long. only 30 chars allow.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    app_service_1.ToPhone,
    __metadata("design:type", String)
], CreateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn(Object.values(user_layers_dto_1.UserLayers)),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userType", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map