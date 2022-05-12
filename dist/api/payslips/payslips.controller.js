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
exports.PayslipsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const payslips_service_1 = require("./payslips.service");
const create_payslip_dto_1 = require("./dto/create-payslip.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PayslipsController = class PayslipsController {
    constructor(payslipsService) {
        this.payslipsService = payslipsService;
    }
    async findAll(req) {
        const payslips = await this.payslipsService.findAll(req.user);
        return payslips;
    }
    async findOne(id, req) {
        const payslip = await this.payslipsService.findById(id, req.user);
        return payslip;
    }
    async create(payslip, req) {
        const createdPayslip = await this.payslipsService.create(payslip, req.user);
        return createdPayslip;
    }
    deleteById(payload, req) {
        return this.payslipsService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayslipsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PayslipsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payslip_dto_1.CreatePayslipDto, Object]),
    __metadata("design:returntype", Promise)
], PayslipsController.prototype, "create", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PayslipsController.prototype, "deleteById", null);
PayslipsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('payslips'),
    __metadata("design:paramtypes", [payslips_service_1.PayslipsService])
], PayslipsController);
exports.PayslipsController = PayslipsController;
//# sourceMappingURL=payslips.controller.js.map