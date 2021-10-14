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
const class_validator_1 = require("class-validator");
const app_service_1 = require("../../../app/app.service");
class QueryAuthUser {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], QueryAuthUser.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Name is required' }),
    __metadata("design:type", String)
], QueryAuthUser.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Email is required' }),
    class_validator_1.IsEmail({}, { message: 'Email address is invalid' }),
    __metadata("design:type", String)
], QueryAuthUser.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Username is required' }),
    __metadata("design:type", String)
], QueryAuthUser.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Matches(app_service_1.PhoneNumberRegex.reg),
    __metadata("design:type", String)
], QueryAuthUser.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], QueryAuthUser.prototype, "website", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], QueryAuthUser.prototype, "subdomain", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], QueryAuthUser.prototype, "userType", void 0);
exports.QueryAuthUser = QueryAuthUser;
//# sourceMappingURL=query-auth-user.dto.js.map