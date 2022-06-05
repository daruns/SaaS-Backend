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
exports.NonInventoryItemsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_nonInventoryItem_dto_1 = require("./dto/update-nonInventoryItem.dto");
const nonInventoryItems_service_1 = require("./nonInventoryItems.service");
const create_nonInventoryItem_dto_1 = require("./dto/create-nonInventoryItem.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const can_decorator_1 = require("../auth/can/decorators/can.decorator");
const subjects_enum_1 = require("../auth/can/enums/subjects.enum");
const actions_enum_1 = require("../auth/can/enums/actions.enum");
let NonInventoryItemsController = class NonInventoryItemsController {
    constructor(nonInventoryItemsService) {
        this.nonInventoryItemsService = nonInventoryItemsService;
    }
    async findAll(req) {
        const nonInventoryItems = await this.nonInventoryItemsService.findAll(req.user);
        return nonInventoryItems;
    }
    async findOne(id, req) {
        const nonInventoryItem = await this.nonInventoryItemsService.findById(id, req.user);
        return nonInventoryItem;
    }
    async create(nonInventoryItem, req) {
        const createdNonInventoryItem = await this.nonInventoryItemsService.create(nonInventoryItem, req.user);
        return createdNonInventoryItem;
    }
    update(payload, req) {
        return this.nonInventoryItemsService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.nonInventoryItemsService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeNonInventoryItems, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NonInventoryItemsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeNonInventoryItems, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NonInventoryItemsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeNonInventoryItems, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nonInventoryItem_dto_1.CreateNonInventoryItemDto, Object]),
    __metadata("design:returntype", Promise)
], NonInventoryItemsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeNonInventoryItems, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_nonInventoryItem_dto_1.UpdateNonInventoryItemDto, Object]),
    __metadata("design:returntype", void 0)
], NonInventoryItemsController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeNonInventoryItems, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], NonInventoryItemsController.prototype, "deleteById", null);
NonInventoryItemsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('nonInventoryItems'),
    __metadata("design:paramtypes", [nonInventoryItems_service_1.NonInventoryItemsService])
], NonInventoryItemsController);
exports.NonInventoryItemsController = NonInventoryItemsController;
//# sourceMappingURL=nonInventoryItems.controller.js.map