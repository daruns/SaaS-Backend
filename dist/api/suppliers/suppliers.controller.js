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
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_supplier_dto_1 = require("./dto/update-supplier.dto");
const suppliers_service_1 = require("./suppliers.service");
const create_supplier_dto_1 = require("./dto/create-supplier.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let SuppliersController = class SuppliersController {
    constructor(suppliersService) {
        this.suppliersService = suppliersService;
    }
    async findAll(req) {
        const suppliers = await this.suppliersService.findAll(req.user);
        return suppliers;
    }
    async findOne(id, req) {
        const supplier = await this.suppliersService.findById(id, req.user);
        return supplier;
    }
    async create(supplier, req) {
        const createdSupplier = await this.suppliersService.create(supplier, req.user);
        return createdSupplier;
    }
    update(payload, req) {
        return this.suppliersService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.suppliersService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_supplier_dto_1.CreateSupplierDto, Object]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_supplier_dto_1.UpdateSupplierDto, Object]),
    __metadata("design:returntype", void 0)
], SuppliersController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SuppliersController.prototype, "deleteById", null);
SuppliersController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('suppliers'),
    __metadata("design:paramtypes", [suppliers_service_1.SuppliersService])
], SuppliersController);
exports.SuppliersController = SuppliersController;
//# sourceMappingURL=suppliers.controller.js.map