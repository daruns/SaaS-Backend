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
exports.UpdateLeaveTypeDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateLeaveTypeDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, fund: { required: true, type: () => Number }, days: { required: true, type: () => Number }, hours: { required: true, type: () => Number }, durationType: { required: true, type: () => String }, urgent: { required: true, type: () => Boolean } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateLeaveTypeDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(['days', 'hours']),
    __metadata("design:type", String)
], UpdateLeaveTypeDto.prototype, "durationType", void 0);
exports.UpdateLeaveTypeDto = UpdateLeaveTypeDto;
//# sourceMappingURL=update-leaveType.dto.js.map