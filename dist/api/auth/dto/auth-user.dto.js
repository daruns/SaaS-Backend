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
exports.AuthUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const query_auth_user_dto_1 = require("./query-auth-user.dto");
class AuthUserDto extends query_auth_user_dto_1.QueryAuthUser {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 8, maxLength: 30 } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Username is required' }),
    __metadata("design:type", String)
], AuthUserDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Password is required' }),
    class_validator_1.MinLength(8, { message: 'Password must have 8 chars' }),
    class_validator_1.MaxLength(30, { message: 'Password is too long. only 30 chars allow.' }),
    __metadata("design:type", String)
], AuthUserDto.prototype, "password", void 0);
exports.AuthUserDto = AuthUserDto;
//# sourceMappingURL=auth-user.dto.js.map