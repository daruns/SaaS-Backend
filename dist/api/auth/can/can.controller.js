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
exports.CanController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const can_service_1 = require("./can.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const can_activate_dto_1 = require("./dto/can-activate.dto");
const can_decorator_1 = require("./decorators/can.decorator");
const actions_enum_1 = require("./enums/actions.enum");
const subjects_enum_1 = require("./enums/subjects.enum");
let CanController = class CanController {
    constructor(canService) {
        this.canService = canService;
    }
    async canActivate(payload, req) {
        let result = false;
        try {
            const canActivate = await this.canService.can(req.user, payload.action, payload.subject);
            if (canActivate === true)
                result = true;
        }
        catch (err) {
            return err;
        }
        return result;
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    can_decorator_1.Can(subjects_enum_1.Subjects.EveryoneAllowed, actions_enum_1.Action.Read),
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [can_activate_dto_1.CanActivateDto, Object]),
    __metadata("design:returntype", Promise)
], CanController.prototype, "canActivate", null);
CanController = __decorate([
    common_1.Controller('can'),
    __metadata("design:paramtypes", [can_service_1.CanService])
], CanController);
exports.CanController = CanController;
//# sourceMappingURL=can.controller.js.map