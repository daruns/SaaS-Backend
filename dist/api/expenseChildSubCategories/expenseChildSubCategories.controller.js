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
exports.ExpenseChildSubCategoriesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const update_expenseChildSubCategory_dto_1 = require("./dto/update-expenseChildSubCategory.dto");
const expenseChildSubCategories_service_1 = require("./expenseChildSubCategories.service");
const create_expenseChildSubCategory_dto_1 = require("./dto/create-expenseChildSubCategory.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const actions_enum_1 = require("../auth/can/enums/actions.enum");
const subjects_enum_1 = require("../auth/can/enums/subjects.enum");
const can_decorator_1 = require("../auth/can/decorators/can.decorator");
let ExpenseChildSubCategoriesController = class ExpenseChildSubCategoriesController {
    constructor(expenseChildSubCategoriesService) {
        this.expenseChildSubCategoriesService = expenseChildSubCategoriesService;
    }
    async findAll(req) {
        const expenseChildSubCategories = await this.expenseChildSubCategoriesService.findAll(req.user);
        return expenseChildSubCategories;
    }
    async findOne(id, req) {
        const expenseChildSubCategory = await this.expenseChildSubCategoriesService.findById(id, req.user);
        return expenseChildSubCategory;
    }
    async create(expenseChildSubCategory, req) {
        const createdExpenseChildSubCategory = await this.expenseChildSubCategoriesService.create(expenseChildSubCategory, req.user);
        return createdExpenseChildSubCategory;
    }
    update(payload, req) {
        return this.expenseChildSubCategoriesService.update(payload, req.user);
    }
    deleteById(payload, req) {
        return this.expenseChildSubCategoriesService.deleteById(payload.id, req.user);
    }
};
__decorate([
    common_1.Get(),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpensesCategoryChilds, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseChildSubCategoriesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpensesCategoryChilds, actions_enum_1.Action.Read),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param('id', new common_1.ParseIntPipe())), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExpenseChildSubCategoriesController.prototype, "findOne", null);
__decorate([
    common_1.Post('create'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpensesCategoryChilds, actions_enum_1.Action.Create),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expenseChildSubCategory_dto_1.CreateExpenseChildSubCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], ExpenseChildSubCategoriesController.prototype, "create", null);
__decorate([
    common_1.Post('update'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpensesCategoryChilds, actions_enum_1.Action.Update),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_expenseChildSubCategory_dto_1.UpdateExpenseChildSubCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], ExpenseChildSubCategoriesController.prototype, "update", null);
__decorate([
    common_1.Post('delete'),
    can_decorator_1.Can(subjects_enum_1.Subjects.financeExpensesCategoryChilds, actions_enum_1.Action.Delete),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ExpenseChildSubCategoriesController.prototype, "deleteById", null);
ExpenseChildSubCategoriesController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('expenseChildSubCategories'),
    __metadata("design:paramtypes", [expenseChildSubCategories_service_1.ExpenseChildSubCategoriesService])
], ExpenseChildSubCategoriesController);
exports.ExpenseChildSubCategoriesController = ExpenseChildSubCategoriesController;
//# sourceMappingURL=expenseChildSubCategories.controller.js.map