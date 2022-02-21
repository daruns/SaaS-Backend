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
exports.TaxesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_tax_dto_1 = require("./dto/update-tax.dto");
const taxes_service_1 = require("./taxes.service");
const create_tax_dto_1 = require("./dto/create-tax.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let TaxesController = class TaxesController {
    constructor(taxesService) {
        this.taxesService = taxesService;
    }
    async findAll(req) {
        const taxes = await this.taxesService.findAll(req.user);
        return taxes;
    }
    async findOne(id, req) {
        const tax = await this.taxesService.findById(id, req.user);
        return tax;
    }
    async create(tax, req) {
        const createdTax = await this.taxesService.create(tax, req.user);
        return createdTax;
    }
    update(payload, req) {
        return this.taxesService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.taxesService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaxesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TaxesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tax_dto_1.CreateTaxDto, Object]),
    __metadata("design:returntype", Promise)
], TaxesController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_tax_dto_1.UpdateTaxDto, Object]),
    __metadata("design:returntype", void 0)
], TaxesController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TaxesController.prototype, "deleteById", null);
TaxesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('taxes'),
    __metadata("design:paramtypes", [taxes_service_1.TaxesService])
], TaxesController);
exports.TaxesController = TaxesController;
//# sourceMappingURL=taxes.controller.js.map