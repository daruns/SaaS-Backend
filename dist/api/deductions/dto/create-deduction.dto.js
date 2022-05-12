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
exports.CreateDeductionDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDeductionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { description: { required: true, type: () => String }, qty: { required: true, type: () => Number }, total: { required: true, type: () => Number }, date: { required: true, type: () => Date }, employeeId: { required: true, type: () => Number }, deductionTypeId: { required: true, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'employeeId is required' }),
    class_validator_1.IsInt({ message: 'employeeId must be integer' }),
    __metadata("design:type", Number)
], CreateDeductionDto.prototype, "employeeId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'deductionTypeId is required' }),
    class_validator_1.IsInt({ message: 'deductionTypeId must be integer' }),
    __metadata("design:type", Number)
], CreateDeductionDto.prototype, "deductionTypeId", void 0);
exports.CreateDeductionDto = CreateDeductionDto;
//# sourceMappingURL=create-deduction.dto.js.map