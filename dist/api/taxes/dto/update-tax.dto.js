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
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateTaxDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, type: { required: true, type: () => String }, rate: { required: true, type: () => Number, minimum: 0.01, maximum: 1 }, status: { required: true, type: () => String }, description: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateTaxDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(0.01),
    class_validator_1.Max(1),
    __metadata("design:type", Number)
], UpdateTaxDto.prototype, "rate", void 0);
exports.UpdateTaxDto = UpdateTaxDto;
//# sourceMappingURL=update-tax.dto.js.map