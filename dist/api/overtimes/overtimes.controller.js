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
exports.OvertimesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_overtime_dto_1 = require("./dto/update-overtime.dto");
const overtimes_service_1 = require("./overtimes.service");
const create_overtime_dto_1 = require("./dto/create-overtime.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const app_service_1 = require("../../app/app.service");
const user_layers_dto_1 = require("../auth/dto/user-layers.dto");
let OvertimesController = class OvertimesController {
    constructor(overtimesService) {
        this.overtimesService = overtimesService;
    }
    async findAll(req) {
        const curUser = req === null || req === void 0 ? void 0 : req.user;
        if (app_service_1.getUserType(curUser) === user_layers_dto_1.UserLayers.layerOne || app_service_1.getUserType(curUser) === user_layers_dto_1.UserLayers.layerTwo) {
            const overtimes = await this.overtimesService.findAll(req.user);
            return overtimes;
        }
        else {
            return {
                success: false,
                message: "Not authorized in this field",
                data: [],
            };
        }
    }
    async findApprovals(req) {
        const overtimeApprovals = await this.overtimesService.findAllApprovals(req.user);
        return overtimeApprovals;
    }
    async findMyOvertimes(req) {
        const myOvertimes = await this.overtimesService.findMyOvertimes(req.user);
        return myOvertimes;
    }
    async findOne(id, req) {
        const overtime = await this.overtimesService.findById(id, req.user);
        return overtime;
    }
    async create(overtime, req) {
        const createdOvertime = await this.overtimesService.createOvertime(overtime, req.user);
        return createdOvertime;
    }
    updateApproval(payload, req) {
        return this.overtimesService.updateApproval(payload, req.user);
    }
    approveOvertime(payload, req) {
        return this.overtimesService.approveOvertime(payload, req.user);
    }
    update(payload, req) {
        return this.overtimesService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.overtimesService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OvertimesController.prototype, "findAll", null);
__decorate([
    common_1.Get('allApprovals'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OvertimesController.prototype, "findApprovals", null);
__decorate([
    common_1.Get('myOvertimes'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OvertimesController.prototype, "findMyOvertimes", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OvertimesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_overtime_dto_1.CreateOvertimeDto, Object]),
    __metadata("design:returntype", Promise)
], OvertimesController.prototype, "create", null);
__decorate([
    common_1.Post('updateApproval'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_overtime_dto_1.UpdateApprovalDto, Object]),
    __metadata("design:returntype", void 0)
], OvertimesController.prototype, "updateApproval", null);
__decorate([
    common_1.Post('approveOvertime'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_overtime_dto_1.UpdateApprovalDto, Object]),
    __metadata("design:returntype", void 0)
], OvertimesController.prototype, "approveOvertime", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_overtime_dto_1.UpdateOvertimeDto, Object]),
    __metadata("design:returntype", void 0)
], OvertimesController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OvertimesController.prototype, "deleteById", null);
OvertimesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('overtimes'),
    __metadata("design:paramtypes", [overtimes_service_1.OvertimesService])
], OvertimesController);
exports.OvertimesController = OvertimesController;
//# sourceMappingURL=overtimes.controller.js.map