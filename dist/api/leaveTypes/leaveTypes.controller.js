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
exports.LeaveTypesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_leaveType_dto_1 = require("./dto/update-leaveType.dto");
const leaveTypes_service_1 = require("./leaveTypes.service");
const create_leaveType_dto_1 = require("./dto/create-leaveType.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let LeaveTypesController = class LeaveTypesController {
    constructor(leaveTypesService) {
        this.leaveTypesService = leaveTypesService;
    }
    async findAll(req) {
        const leaveTypes = await this.leaveTypesService.findAll(req.user);
        return leaveTypes;
    }
    async findOne(id, req) {
        const leaveType = await this.leaveTypesService.findById(id, req.user);
        return leaveType;
    }
    async create(leaveType, req) {
        const createdLeaveType = await this.leaveTypesService.create(leaveType, req.user);
        return createdLeaveType;
    }
    update(payload, req) {
        return this.leaveTypesService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.leaveTypesService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeaveTypesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leaveType_dto_1.CreateLeaveTypeDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypesController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_leaveType_dto_1.UpdateLeaveTypeDto, Object]),
    __metadata("design:returntype", void 0)
], LeaveTypesController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeaveTypesController.prototype, "deleteById", null);
LeaveTypesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('leaveTypes'),
    __metadata("design:paramtypes", [leaveTypes_service_1.LeaveTypesService])
], LeaveTypesController);
exports.LeaveTypesController = LeaveTypesController;
//# sourceMappingURL=leaveTypes.controller.js.map