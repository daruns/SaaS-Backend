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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeductionTypesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_deductionType_dto_1 = require("./dto/update-deductionType.dto");
const deductionTypes_service_1 = require("./deductionTypes.service");
const create_deductionType_dto_1 = require("./dto/create-deductionType.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const actions_enum_1 = require("../auth/can/enums/actions.enum");
const subjects_enum_1 = require("../auth/can/enums/subjects.enum");
const can_decorator_1 = require("../auth/can/decorators/can.decorator");
let DeductionTypesController = class DeductionTypesController {
    constructor(deductionTypesService) {
        this.deductionTypesService = deductionTypesService;
    }
    async findAll(req) {
        const deductionTypes = await this.deductionTypesService.findAll(req.user);
        return deductionTypes;
    }
    async findOne(id, req) {
        const deductionType = await this.deductionTypesService.findById(id, req.user);
        return deductionType;
    }
    async create(deductionType, req) {
        const createdDeductionType = await this.deductionTypesService.create(deductionType, req.user);
        return createdDeductionType;
    }
    async update(payload, req) {
        return this.deductionTypesService.update(payload, req.user);
    }
    async deleteById(payload, req) {
        return this.deductionTypesService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollDeductionTypes, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeductionTypesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollDeductionTypes, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DeductionTypesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollDeductionTypes, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_deductionType_dto_1.CreateDeductionTypeDto, Object]),
    __metadata("design:returntype", Promise)
], DeductionTypesController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollDeductionTypes, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_deductionType_dto_1.UpdateDeductionTypeDto, Object]),
    __metadata("design:returntype", Promise)
], DeductionTypesController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollDeductionTypes, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DeductionTypesController.prototype, "deleteById", null);
DeductionTypesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('deductionTypes'),
    __metadata("design:paramtypes", [deductionTypes_service_1.DeductionTypesService])
], DeductionTypesController);
exports.DeductionTypesController = DeductionTypesController;
//# sourceMappingURL=deductionTypes.controller.js.map