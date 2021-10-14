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
class UpdateClientDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'ClientId is required' }),
    class_validator_1.IsInt({ message: 'Client id must be integer' }),
    __metadata("design:type", Number)
], UpdateClientDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Matches(app_service_1.PhoneNumberRegex.reg),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "phoneNumber1", void 0);
exports.UpdateClientDto = UpdateClientDto;
//# sourceMappingURL=update-client.dto.js.map