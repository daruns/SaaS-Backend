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
exports.CreateLeaveDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateLeaveDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, from: { required: true, type: () => Date }, leaveTypeId: { required: true, type: () => Number }, currentBalance: { required: true, type: () => Number }, remainBalance: { required: true, type: () => Number }, to: { required: true, type: () => Date }, employeeId: { required: true, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], CreateLeaveDto.prototype, "from", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateLeaveDto.prototype, "leaveTypeId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], CreateLeaveDto.prototype, "to", void 0);
exports.CreateLeaveDto = CreateLeaveDto;
//# sourceMappingURL=create-leave.dto.js.map