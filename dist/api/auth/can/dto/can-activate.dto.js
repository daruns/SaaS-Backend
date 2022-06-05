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
exports.CanActivateDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const subjects_enum_1 = require("../enums/subjects.enum");
const actions_enum_1 = require("../enums/actions.enum");
class CanActivateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { subject: { required: true, type: () => String }, action: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'subject is required' }),
    class_validator_1.IsIn(subjects_enum_1.SubjectsDto),
    __metadata("design:type", String)
], CanActivateDto.prototype, "subject", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'action is required' }),
    class_validator_1.IsIn(actions_enum_1.ActionsDto),
    __metadata("design:type", String)
], CanActivateDto.prototype, "action", void 0);
exports.CanActivateDto = CanActivateDto;
//# sourceMappingURL=can-activate.dto.js.map