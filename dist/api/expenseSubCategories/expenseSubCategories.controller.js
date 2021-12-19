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
const update_expenseSubCategory_dto_1 = require("./dto/update-expenseSubCategory.dto");
const expenseSubCategories_service_1 = require("./expenseSubCategories.service");
const create_expenseSubCategory_dto_1 = require("./dto/create-expenseSubCategory.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ExpenseSubCategoriesController = class ExpenseSubCategoriesController {
    constructor(expenseSubCategoriesService) {
        this.expenseSubCategoriesService = expenseSubCategoriesService;
    }
    async findAll(req) {
        const expenseSubCategories = await this.expenseSubCategoriesService.findAll(req.user);
        return expenseSubCategories;
    }
    async findOne(id, req) {
        const expenseSubCategory = await this.expenseSubCategoriesService.findById(id, req.user);
        return expenseSubCategory;
    }
    async create(expenseSubCategory, req) {
        const createdExpenseSubCategory = await this.expenseSubCategoriesService.create(expenseSubCategory, req.user);
        return createdExpenseSubCategory;
    }
    update(payload, req) {
        return this.expenseSubCategoriesService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.expenseSubCategoriesService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseSubCategoriesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExpenseSubCategoriesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expenseSubCategory_dto_1.CreateExpenseSubCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], ExpenseSubCategoriesController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_expenseSubCategory_dto_1.UpdateExpenseSubCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], ExpenseSubCategoriesController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ExpenseSubCategoriesController.prototype, "deleteById", null);
ExpenseSubCategoriesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('expenseSubCategories'),
    __metadata("design:paramtypes", [expenseSubCategories_service_1.ExpenseSubCategoriesService])
], ExpenseSubCategoriesController);
exports.ExpenseSubCategoriesController = ExpenseSubCategoriesController;
//# sourceMappingURL=expenseSubCategories.controller.js.map