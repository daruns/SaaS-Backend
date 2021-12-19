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
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_inventoryItem_dto_1 = require("./dto/update-inventoryItem.dto");
const inventoryItems_service_1 = require("./inventoryItems.service");
const create_inventoryItem_dto_1 = require("./dto/create-inventoryItem.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let InventoryItemsController = class InventoryItemsController {
    constructor(inventoryItemsService) {
        this.inventoryItemsService = inventoryItemsService;
    }
    async findAll(req) {
        const inventoryItems = await this.inventoryItemsService.findAll(req.user);
        return inventoryItems;
    }
    async findOne(id, req) {
        const inventoryItem = await this.inventoryItemsService.findById(id, req.user);
        return inventoryItem;
    }
    async create(inventoryItem, req) {
        const createdInventoryItem = await this.inventoryItemsService.create(inventoryItem, req.user);
        return createdInventoryItem;
    }
    update(payload, req) {
        return this.inventoryItemsService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.inventoryItemsService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryItemsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InventoryItemsController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inventoryItem_dto_1.CreateInventoryItemDto, Object]),
    __metadata("design:returntype", Promise)
], InventoryItemsController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_inventoryItem_dto_1.UpdateInventoryItemDto, Object]),
    __metadata("design:returntype", void 0)
], InventoryItemsController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], InventoryItemsController.prototype, "deleteById", null);
InventoryItemsController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('inventoryItems'),
    __metadata("design:paramtypes", [inventoryItems_service_1.InventoryItemsService])
], InventoryItemsController);
exports.InventoryItemsController = InventoryItemsController;
//# sourceMappingURL=inventoryItems.controller.js.map