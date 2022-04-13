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
exports.PaymentMethodsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_paymentMethod_dto_1 = require("./dto/update-paymentMethod.dto");
const paymentMethods_service_1 = require("./paymentMethods.service");
const create_paymentMethod_dto_1 = require("./dto/create-paymentMethod.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PaymentMethodsController = class PaymentMethodsController {
    constructor(paymentMethodsService) {
        this.paymentMethodsService = paymentMethodsService;
    }
    async findAll(req) {
        const paymentMethods = await this.paymentMethodsService.findAll(req.user);
        return paymentMethods;
    }
    async findOne(id, req) {
        const paymentMethod = await this.paymentMethodsService.findById(id, req.user);
        return paymentMethod;
    }
    async create(paymentMethod, req) {
        const createdPaymentMethod = await this.paymentMethodsService.create(paymentMethod, req.user);
        return createdPaymentMethod;
    }
    update(payload, req) {
        return this.paymentMethodsService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.paymentMethodsService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_paymentMethod_dto_1.CreatePaymentMethodDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_paymentMethod_dto_1.UpdatePaymentMethodDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentMethodsController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentMethodsController.prototype, "deleteById", null);
PaymentMethodsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('paymentMethods'),
    __metadata("design:paramtypes", [paymentMethods_service_1.PaymentMethodsService])
], PaymentMethodsController);
exports.PaymentMethodsController = PaymentMethodsController;
//# sourceMappingURL=paymentMethods.controller.js.map