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
exports.OvertimeTypesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_overtimeType_dto_1 = require("./dto/update-overtimeType.dto");
const overtimeTypes_service_1 = require("./overtimeTypes.service");
const create_overtimeType_dto_1 = require("./dto/create-overtimeType.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let OvertimeTypesController = class OvertimeTypesController {
    constructor(overtimeTypesService) {
        this.overtimeTypesService = overtimeTypesService;
    }
    async findAll(req) {
        const overtimeTypes = await this.overtimeTypesService.findAll(req.user);
        return overtimeTypes;
    }
    async findOne(id, req) {
        const overtimeType = await this.overtimeTypesService.findById(id, req.user);
        return overtimeType;
    }
    async create(overtimeType, req) {
        const createdOvertimeType = await this.overtimeTypesService.create(overtimeType, req.user);
        return createdOvertimeType;
    }
    update(payload, req) {
        return this.overtimeTypesService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.overtimeTypesService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OvertimeTypesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OvertimeTypesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_overtimeType_dto_1.CreateOvertimeTypeDto, Object]),
    __metadata("design:returntype", Promise)
], OvertimeTypesController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_overtimeType_dto_1.UpdateOvertimeTypeDto, Object]),
    __metadata("design:returntype", void 0)
], OvertimeTypesController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OvertimeTypesController.prototype, "deleteById", null);
OvertimeTypesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('overtimeTypes'),
    __metadata("design:paramtypes", [overtimeTypes_service_1.OvertimeTypesService])
], OvertimeTypesController);
exports.OvertimeTypesController = OvertimeTypesController;
//# sourceMappingURL=overtimeTypes.controller.js.map