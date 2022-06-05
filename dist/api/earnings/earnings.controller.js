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
exports.EarningsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_earning_dto_1 = require("./dto/update-earning.dto");
const earnings_service_1 = require("./earnings.service");
const create_earning_dto_1 = require("./dto/create-earning.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const actions_enum_1 = require("../auth/can/enums/actions.enum");
const subjects_enum_1 = require("../auth/can/enums/subjects.enum");
const can_decorator_1 = require("../auth/can/decorators/can.decorator");
let EarningsController = class EarningsController {
    constructor(earningsService) {
        this.earningsService = earningsService;
    }
    async findAll(req) {
        const earnings = await this.earningsService.findAll(req.user);
        return earnings;
    }
    async findOne(id, req) {
        const earning = await this.earningsService.findById(id, req.user);
        return earning;
    }
    async create(earning, req) {
        const createdEarning = await this.earningsService.create(earning, req.user);
        return createdEarning;
    }
    update(payload, req) {
        return this.earningsService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.earningsService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollEarnings, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EarningsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollEarnings, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EarningsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollEarnings, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_earning_dto_1.CreateEarningDto, Object]),
    __metadata("design:returntype", Promise)
], EarningsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollEarnings, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_earning_dto_1.UpdateEarningDto, Object]),
    __metadata("design:returntype", void 0)
], EarningsController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    can_decorator_1.Can(subjects_enum_1.Subjects.payrollEarnings, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EarningsController.prototype, "deleteById", null);
EarningsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('earnings'),
    __metadata("design:paramtypes", [earnings_service_1.EarningsService])
], EarningsController);
exports.EarningsController = EarningsController;
//# sourceMappingURL=earnings.controller.js.map