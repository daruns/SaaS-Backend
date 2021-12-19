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
class CreateTaskDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, priority: { required: true, type: () => String }, plannedStartDate: { required: true, type: () => Date }, plannedEndDate: { required: true, type: () => Date }, status: { required: true, type: () => String }, boardId: { required: true, type: () => Number }, projectId: { required: true, type: () => Number }, members: { required: true, type: () => [Number] } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "priority", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], CreateTaskDto.prototype, "plannedStartDate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Date)
], CreateTaskDto.prototype, "plannedEndDate", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "boardId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Array)
], CreateTaskDto.prototype, "members", void 0);
exports.CreateTaskDto = CreateTaskDto;
//# sourceMappingURL=create-task.dto.js.map