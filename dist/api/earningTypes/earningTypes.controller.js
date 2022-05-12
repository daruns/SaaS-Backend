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
exports.EarningTypesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_earningType_dto_1 = require("./dto/update-earningType.dto");
const earningTypes_service_1 = require("./earningTypes.service");
const create_earningType_dto_1 = require("./dto/create-earningType.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let EarningTypesController = class EarningTypesController {
    constructor(earningTypesService) {
        this.earningTypesService = earningTypesService;
    }
    async findAll(req) {
        const earningTypes = await this.earningTypesService.findAll(req.user);
        return earningTypes;
    }
    async findOne(id, req) {
        const earningType = await this.earningTypesService.findById(id, req.user);
        return earningType;
    }
    async create(earningType, req) {
        const createdEarningType = await this.earningTypesService.create(earningType, req.user);
        return createdEarningType;
    }
    update(payload, req) {
        return this.earningTypesService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.earningTypesService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EarningTypesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EarningTypesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_earningType_dto_1.CreateEarningTypeDto, Object]),
    __metadata("design:returntype", Promise)
], EarningTypesController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_earningType_dto_1.UpdateEarningTypeDto, Object]),
    __metadata("design:returntype", void 0)
], EarningTypesController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EarningTypesController.prototype, "deleteById", null);
EarningTypesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('earningTypes'),
    __metadata("design:paramtypes", [earningTypes_service_1.EarningTypesService])
], EarningTypesController);
exports.EarningTypesController = EarningTypesController;
//# sourceMappingURL=earningTypes.controller.js.map