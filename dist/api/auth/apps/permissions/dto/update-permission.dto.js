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
exports.UpdatePermissionDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdatePermissionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, subject: { required: true, type: () => String }, action: { required: true, type: () => String }, resource: { required: true, type: () => String }, weight: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, roleId: { required: true, type: () => Number }, status: { required: true, type: () => String }, deleted: { required: true, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty({ message: 'id is required' }),
    __metadata("design:type", Number)
], UpdatePermissionDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdatePermissionDto.prototype, "weight", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdatePermissionDto.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdatePermissionDto.prototype, "roleId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdatePermissionDto.prototype, "deleted", void 0);
exports.UpdatePermissionDto = UpdatePermissionDto;
//# sourceMappingURL=update-permission.dto.js.map