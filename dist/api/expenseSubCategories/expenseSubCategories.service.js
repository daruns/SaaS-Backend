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
exports.ExpenseSubCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const expenseCategories_service_1 = require("../expenseCategories/expenseCategories.service");
let ExpenseSubCategoriesService = class ExpenseSubCategoriesService {
    constructor(modelClass, expenseCategoryService) {
        this.modelClass = modelClass;
        this.expenseCategoryService = expenseCategoryService;
    }
    async findAll(currentUser) {
        const expenseSubCategories = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'InventoryItem details fetch successfully.',
            data: expenseSubCategories,
        };
    }
    async findById(id, currentUser) {
        const expenseSubCategory = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (expenseSubCategory) {
            return {
                success: true,
                message: 'ExpenseSubCategory details fetch successfully.',
                data: expenseSubCategory,
            };
        }
        else {
            return {
                success: false,
                message: 'No expenseSubCategory details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const expenseSubCategoryPayload = payload;
        const newExpenseSubCategory = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: expenseSubCategoryPayload.name
        });
        if (!newExpenseSubCategory) {
            if (expenseSubCategoryPayload.expenseCategoryId) {
                const clientFnd = await this.expenseCategoryService.findById(expenseSubCategoryPayload.expenseCategoryId, currentUser);
                if (!clientFnd.success) {
                    return {
                        success: false,
                        message: 'expenseCategory doesnt exist.',
                        data: {},
                    };
                }
            }
            expenseSubCategoryPayload['createdBy'] = currentUser.username;
            expenseSubCategoryPayload['brandCode'] = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(expenseSubCategoryPayload);
            const createExpenseSubCategory = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'ExpenseSubCategory created successfully.',
                data: createExpenseSubCategory,
            };
        }
        else {
            return {
                success: false,
                message: 'ExpenseSubCategory already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const expenseSubCategoryPayload = payload;
        const expenseSubCategory = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(expenseSubCategoryPayload.id);
        if (expenseSubCategory) {
            const updatedExpenseSubCategory = await this.modelClass
                .query()
                .update({
                name: expenseSubCategoryPayload.name ? expenseSubCategoryPayload.name : expenseSubCategory.name,
                description: expenseSubCategoryPayload.description ? expenseSubCategoryPayload.description : expenseSubCategory.description,
                updatedBy: currentUser.username,
            })
                .where({ id: expenseSubCategoryPayload.id });
            return {
                success: true,
                message: 'ExpenseSubCategory details updated successfully.',
                data: updatedExpenseSubCategory,
            };
        }
        else {
            return {
                success: false,
                message: 'No expenseSubCategory found.',
                data: {},
            };
        }
    }
    async deleteById(expenseSubCategoryId, currentUser) {
        const expenseSubCategories = await this.modelClass.query()
            .where({
            brandCode: currentUser.brandCode,
            id: expenseSubCategoryId
        })
            .delete();
        if (expenseSubCategories) {
            return {
                success: true,
                message: 'ExpenseSubCategory deleted successfully.',
                data: expenseSubCategories,
            };
        }
        else {
            return {
                success: false,
                message: 'No expenseSubCategory found.',
                data: {},
            };
        }
    }
};
ExpenseSubCategoriesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ExpenseSubCategoryModel')),
    __metadata("design:paramtypes", [Object, expenseCategories_service_1.ExpenseCategoriesService])
], ExpenseSubCategoriesService);
exports.ExpenseSubCategoriesService = ExpenseSubCategoriesService;
//# sourceMappingURL=expenseSubCategories.service.js.map