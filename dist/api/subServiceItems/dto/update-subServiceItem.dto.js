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
const app_service_1 = require("../../../app/app.service");
class UpdateSubServiceItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, serviceItemId: { required: true, type: () => Number }, unitPrice: { required: true, type: () => Number }, purchasedAt: { required: true, type: () => Date }, expireDate: { required: true, type: () => Date }, supplier: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateSubServiceItemDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateSubServiceItemDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateSubServiceItemDto.prototype, "serviceItemId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateSubServiceItemDto.prototype, "unitPrice", void 0);
exports.UpdateSubServiceItemDto = UpdateSubServiceItemDto;
//# sourceMappingURL=update-subServiceItem.dto.js.map