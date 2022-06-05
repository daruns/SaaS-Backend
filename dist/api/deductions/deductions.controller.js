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
exports.DeductionsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_deduction_dto_1 = require("./dto/update-deduction.dto");
const deductions_service_1 = require("./deductions.service");
const create_deduction_dto_1 = require("./dto/create-deduction.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const subjects_enum_1 = require("../auth/can/enums/subjects.enum");
const actions_enum_1 = require("../auth/can/enums/actions.enum");
const can_decorator_1 = require("../auth/can/decorators/can.decorator");
let DeductionsController = class DeductionsController {
    constructor(deductionsService) {
        this.deductionsService = deductionsService;
    }
    async findAll(req) {
        const deductions = await this.deductionsService.findAll(req.user);
        return deductions;
    }
    async findOne(id, req) {
        const deduction = await this.deductionsService.findById(id, req.user);
        return deduction;
    }
    async create(deduction, req) {
        const createdDeduction = await this.deductionsService.create(deduction, req.user);
        return createdDeduction;
    }
    async update(payload, req) {
        return this.deductionsService.update(payload, req.user);
    }
    async deleteById(payload, req) {
        return this.deductionsService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollDeductions, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeductionsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollDeductions, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DeductionsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollDeductions, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_deduction_dto_1.CreateDeductionDto, Object]),
    __metadata("design:returntype", Promise)
], DeductionsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollDeductions, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_deduction_dto_1.UpdateDeductionDto, Object]),
    __metadata("design:returntype", Promise)
], DeductionsController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollDeductions, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DeductionsController.prototype, "deleteById", null);
DeductionsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('deductions'),
    __metadata("design:paramtypes", [deductions_service_1.DeductionsService])
], DeductionsController);
exports.DeductionsController = DeductionsController;
//# sourceMappingURL=deductions.controller.js.map