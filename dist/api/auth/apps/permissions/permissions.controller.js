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
exports.PermissionsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./permissions.service");
const create_permission_dto_1 = require("./dto/create-permission.dto");
const update_permission_dto_1 = require("./dto/update-permission.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const subjects_enum_1 = require("../../can/enums/subjects.enum");
const actions_enum_1 = require("../../can/enums/actions.enum");
const can_decorator_1 = require("../../can/decorators/can.decorator");
let PermissionsController = class PermissionsController {
    constructor(permissionsService) {
        this.permissionsService = permissionsService;
    }
    async findAll(req) {
        const permissions = await this.permissionsService.findAll(req.user);
        return permissions;
    }
    async findOne(id, req) {
        const post = await this.permissionsService.findById(id, req.user);
        return post;
    }
    create(payload, req) {
        return this.permissionsService.create(payload, req.user);
    }
    update(payload, req) {
        return this.permissionsService.update(payload, req.user);
    }
    delete(payload, req) {
        return this.permissionsService.delete(payload, req.user);
    }
};
__decorate([
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.OwnerAllowed, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    can_decorator_1.Can(subjects_enum_1.Subjects.OwnerAllowed, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    can_decorator_1.Can(subjects_enum_1.Subjects.OwnerAllowed, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto, Object]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    can_decorator_1.Can(subjects_enum_1.Subjects.OwnerAllowed, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_permission_dto_1.UpdatePermissionDto, Object]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    can_decorator_1.Can(subjects_enum_1.Subjects.OwnerAllowed, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "delete", null);
PermissionsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('permissions'),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
exports.PermissionsController = PermissionsController;
//# sourceMappingURL=permissions.controller.js.map