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
exports.SubServiceItemsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_subServiceItem_dto_1 = require("./dto/update-subServiceItem.dto");
const subServiceItems_service_1 = require("./subServiceItems.service");
const create_subServiceItem_dto_1 = require("./dto/create-subServiceItem.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const can_decorator_1 = require("../auth/can/decorators/can.decorator");
const subjects_enum_1 = require("../auth/can/enums/subjects.enum");
const actions_enum_1 = require("../auth/can/enums/actions.enum");
let SubServiceItemsController = class SubServiceItemsController {
    constructor(subServiceItemsService) {
        this.subServiceItemsService = subServiceItemsService;
    }
    async findAll(req) {
        const subServiceItems = await this.subServiceItemsService.findAll(req.user);
        return subServiceItems;
    }
    async findOne(id, req) {
        const subServiceItem = await this.subServiceItemsService.findById(id, req.user);
        return subServiceItem;
    }
    async create(subServiceItem, req) {
        const createdSubServiceItem = await this.subServiceItemsService.create(subServiceItem, req.user);
        return createdSubServiceItem;
    }
    update(payload, req) {
        return this.subServiceItemsService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.subServiceItemsService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeSubServiceItems, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubServiceItemsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeSubServiceItems, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubServiceItemsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeSubServiceItems, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subServiceItem_dto_1.CreateSubServiceItemDto, Object]),
    __metadata("design:returntype", Promise)
], SubServiceItemsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeSubServiceItems, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_subServiceItem_dto_1.UpdateSubServiceItemDto, Object]),
    __metadata("design:returntype", void 0)
], SubServiceItemsController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeSubServiceItems, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SubServiceItemsController.prototype, "deleteById", null);
SubServiceItemsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('subServiceItems'),
    __metadata("design:paramtypes", [subServiceItems_service_1.SubServiceItemsService])
], SubServiceItemsController);
exports.SubServiceItemsController = SubServiceItemsController;
//# sourceMappingURL=subServiceItems.controller.js.map