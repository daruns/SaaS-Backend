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
const update_expenseCategory_dto_1 = require("./dto/update-expenseCategory.dto");
const expenseCategories_service_1 = require("./expenseCategories.service");
const create_expenseCategory_dto_1 = require("./dto/create-expenseCategory.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ExpenseCategoriesController = class ExpenseCategoriesController {
    constructor(expenseCategoriesService) {
        this.expenseCategoriesService = expenseCategoriesService;
    }
    async findAll(req) {
        const expenseCategories = await this.expenseCategoriesService.findAll(req.user);
        return expenseCategories;
    }
    async findOne(id, req) {
        const expenseCategory = await this.expenseCategoriesService.findById(id, req.user);
        return expenseCategory;
    }
    async create(expenseCategory, req) {
        const createdExpenseCategory = await this.expenseCategoriesService.create(expenseCategory, req.user);
        return createdExpenseCategory;
    }
    update(payload, req) {
        return this.expenseCategoriesService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.expenseCategoriesService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expenseCategory_dto_1.CreateExpenseCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_expenseCategory_dto_1.UpdateExpenseCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], ExpenseCategoriesController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ExpenseCategoriesController.prototype, "deleteById", null);
ExpenseCategoriesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('expenseCategories'),
    __metadata("design:paramtypes", [expenseCategories_service_1.ExpenseCategoriesService])
], ExpenseCategoriesController);
exports.ExpenseCategoriesController = ExpenseCategoriesController;
//# sourceMappingURL=expenseCategories.controller.js.map