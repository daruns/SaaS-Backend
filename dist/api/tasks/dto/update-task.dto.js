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
exports.ChangeBoardDto = exports.UpdateTaskDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateTaskDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, priority: { required: true, type: () => String }, actualStartDate: { required: true, type: () => Date }, actualdEndDate: { required: true, type: () => Date }, plannedStartDate: { required: true, type: () => Date }, plannedEndDate: { required: true, type: () => Date }, boardId: { required: true, type: () => Number }, status: { required: true, type: () => String }, deleted: { required: true, type: () => Number }, members: { required: true, type: () => [Number] } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], UpdateTaskDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Array)
], UpdateTaskDto.prototype, "members", void 0);
exports.UpdateTaskDto = UpdateTaskDto;
class ChangeBoardDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, boardId: { required: true, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], ChangeBoardDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], ChangeBoardDto.prototype, "boardId", void 0);
exports.ChangeBoardDto = ChangeBoardDto;
//# sourceMappingURL=update-task.dto.js.map