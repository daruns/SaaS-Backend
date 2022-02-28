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
exports.UpdateApprovalDto = exports.UpdateLeaveDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateLeaveDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, from: { required: true, type: () => Date }, to: { required: true, type: () => Date }, currentBalance: { required: true, type: () => Number }, remainBalance: { required: true, type: () => Number }, employeeId: { required: true, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateLeaveDto.prototype, "id", void 0);
exports.UpdateLeaveDto = UpdateLeaveDto;
class UpdateApprovalDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, status: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateApprovalDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsIn(['approved', 'declined']),
    __metadata("design:type", String)
], UpdateApprovalDto.prototype, "status", void 0);
exports.UpdateApprovalDto = UpdateApprovalDto;
//# sourceMappingURL=update-leave.dto.js.map