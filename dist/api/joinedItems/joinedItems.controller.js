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
exports.JoinedItemsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const joinedItems_service_1 = require("./joinedItems.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const can_decorator_1 = require("../auth/can/decorators/can.decorator");
const subjects_enum_1 = require("../auth/can/enums/subjects.enum");
const actions_enum_1 = require("../auth/can/enums/actions.enum");
let JoinedItemsController = class JoinedItemsController {
    constructor(joinedItemsService) {
        this.joinedItemsService = joinedItemsService;
    }
    async findAll(req) {
        const joinedItems = await this.joinedItemsService.findAll(req.user);
        return joinedItems;
    }
    async findAllExpenseCategories(req) {
        const joinedItems = await this.joinedItemsService.findAllExpenseCategories(req.user);
        return joinedItems;
    }
};
__decorate([
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeJoinedItems, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JoinedItemsController.prototype, "findAll", null);
__decorate([
    common_1.Get('joinedExpenseCategories'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeJoinedExpenseCategories, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JoinedItemsController.prototype, "findAllExpenseCategories", null);
JoinedItemsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('joinedItems'),
    __metadata("design:paramtypes", [joinedItems_service_1.JoinedItemsService])
], JoinedItemsController);
exports.JoinedItemsController = JoinedItemsController;
//# sourceMappingURL=joinedItems.controller.js.map