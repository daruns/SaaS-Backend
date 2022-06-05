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
exports.LeavesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_leave_dto_1 = require("./dto/update-leave.dto");
const leaves_service_1 = require("./leaves.service");
const create_leave_dto_1 = require("./dto/create-leave.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const app_service_1 = require("../../app/app.service");
const user_layers_dto_1 = require("../auth/dto/user-layers.dto");
const can_decorator_1 = require("../auth/can/decorators/can.decorator");
const subjects_enum_1 = require("../auth/can/enums/subjects.enum");
const actions_enum_1 = require("../auth/can/enums/actions.enum");
let LeavesController = class LeavesController {
    constructor(leavesService) {
        this.leavesService = leavesService;
    }
    async findAll(req) {
        const curUser = req === null || req === void 0 ? void 0 : req.user;
        if (app_service_1.getUserType(curUser) === user_layers_dto_1.UserLayers.layerOne || app_service_1.getUserType(curUser) === user_layers_dto_1.UserLayers.layerTwo) {
            const leaves = await this.leavesService.findAll(req.user);
            return leaves;
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
        const leaveApprovals = await this.leavesService.findAllApprovals(req.user);
        return leaveApprovals;
    }
    async findMyLeaves(req) {
        const myLeaves = await this.leavesService.findMyLeaves(req.user);
        return myLeaves;
    }
    async findOne(id, req) {
        const leave = await this.leavesService.findById(id, req.user);
        return leave;
    }
    async create(leave, req) {
        const createdLeave = await this.leavesService.createLeave(leave, req.user);
        return createdLeave;
    }
    updateApproval(payload, req) {
        return this.leavesService.updateApproval(payload, req.user);
    }
    approveLeave(payload, req) {
        return this.leavesService.approveLeave(payload, req.user);
    }
    update(payload, req) {
        return this.leavesService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.leavesService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.hrmLeaves, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "findAll", null);
__decorate([
    common_1.Get('allApprovals'),
    can_decorator_1.Can(subjects_enum_1.Subjects.hrmLeaves, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "findApprovals", null);
__decorate([
    common_1.Get('myLeaves'),
    can_decorator_1.Can(subjects_enum_1.Subjects.hrmLeaves, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "findMyLeaves", null);
__decorate([
    common_1.Get(':id'),
    can_decorator_1.Can(subjects_enum_1.Subjects.hrmLeaves, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    can_decorator_1.Can(subjects_enum_1.Subjects.hrmLeaves, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_dto_1.CreateLeaveDto, Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "create", null);
__decorate([
    common_1.Post('updateApproval'),
    can_decorator_1.Can(subjects_enum_1.Subjects.hrmLeaves, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_leave_dto_1.UpdateApprovalDto, Object]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "updateApproval", null);
__decorate([
    common_1.Post('approveLeave'),
    can_decorator_1.Can(subjects_enum_1.Subjects.hrmLeaves, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_leave_dto_1.UpdateApprovalDto, Object]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "approveLeave", null);
__decorate([
    common_1.Post('update'),
    can_decorator_1.Can(subjects_enum_1.Subjects.hrmLeaves, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_leave_dto_1.UpdateLeaveDto, Object]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    can_decorator_1.Can(subjects_enum_1.Subjects.hrmLeaves, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeavesController.prototype, "deleteById", null);
LeavesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('leaves'),
    __metadata("design:paramtypes", [leaves_service_1.LeavesService])
], LeavesController);
exports.LeavesController = LeavesController;
//# sourceMappingURL=leaves.controller.js.map