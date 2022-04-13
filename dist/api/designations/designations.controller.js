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
exports.DesignationsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_designation_dto_1 = require("./dto/update-designation.dto");
const designations_service_1 = require("./designations.service");
const create_designation_dto_1 = require("./dto/create-designation.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let DesignationsController = class DesignationsController {
    constructor(designationsService) {
        this.designationsService = designationsService;
    }
    async findAll(req) {
        const designations = await this.designationsService.findAll(req.user);
        return designations;
    }
    async findOne(id, req) {
        const designation = await this.designationsService.findById(id, req.user);
        return designation;
    }
    async create(designation, req) {
        const createdDesignation = await this.designationsService.create(designation, req.user);
        return createdDesignation;
    }
    update(payload, req) {
        return this.designationsService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.designationsService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DesignationsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DesignationsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_designation_dto_1.CreateDesignationDto, Object]),
    __metadata("design:returntype", Promise)
], DesignationsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_designation_dto_1.UpdateDesignationDto, Object]),
    __metadata("design:returntype", void 0)
], DesignationsController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DesignationsController.prototype, "deleteById", null);
DesignationsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('designations'),
    __metadata("design:paramtypes", [designations_service_1.DesignationsService])
], DesignationsController);
exports.DesignationsController = DesignationsController;
//# sourceMappingURL=designations.controller.js.map