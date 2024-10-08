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
exports.CreateOvertimeTypeDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateOvertimeTypeDto {
    constructor() {
        this.durationType = 'hours';
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, fund: { required: true, type: () => Number }, days: { required: true, type: () => Number }, hours: { required: true, type: () => Number }, durationType: { required: true, type: () => String, default: 'hours' } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Name is required' }),
    __metadata("design:type", String)
], CreateOvertimeTypeDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn(['days', 'hours']),
    __metadata("design:type", String)
], CreateOvertimeTypeDto.prototype, "durationType", void 0);
exports.CreateOvertimeTypeDto = CreateOvertimeTypeDto;
//# sourceMappingURL=create-overtimeType.dto.js.map