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
exports.ExpenseChildSubCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const expenseSubCategories_service_1 = require("../expenseSubCategories/expenseSubCategories.service");
let ExpenseChildSubCategoriesService = class ExpenseChildSubCategoriesService {
    constructor(modelClass, expenseSubCategoryService) {
        this.modelClass = modelClass;
        this.expenseSubCategoryService = expenseSubCategoryService;
    }
    async findAll(currentUser) {
        const expenseChildSubCategories = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode });
        return {
            success: true,
            message: 'InventoryItem details fetch successfully.',
            data: expenseChildSubCategories,
        };
    }
    async findById(id, currentUser) {
        const expenseChildSubCategory = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id);
        if (expenseChildSubCategory) {
            return {
                success: true,
                message: 'ExpenseChildSubCategory details fetch successfully.',
                data: expenseChildSubCategory,
            };
        }
        else {
            return {
                success: false,
                message: 'No expenseChildSubCategory details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const expenseChildSubCategoryPayload = payload;
        const newExpenseChildSubCategory = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: expenseChildSubCategoryPayload.name
        });
        if (!newExpenseChildSubCategory) {
            if (expenseChildSubCategoryPayload.expenseSubCategoryId) {
                const clientFnd = await this.expenseSubCategoryService.findById(expenseChildSubCategoryPayload.expenseSubCategoryId, currentUser);
                if (!clientFnd.success) {
                    return {
                        success: false,
                        message: 'expenseSubCategory doesnt exist.',
                        data: {},
                    };
                }
            }
            expenseChildSubCategoryPayload['createdBy'] = currentUser.username;
            expenseChildSubCategoryPayload['brandCode'] = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(expenseChildSubCategoryPayload);
            const createExpenseChildSubCategory = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'ExpenseChildSubCategory created successfully.',
                data: createExpenseChildSubCategory,
            };
        }
        else {
            return {
                success: false,
                message: 'ExpenseChildSubCategory already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const expenseChildSubCategoryPayload = payload;
        const expenseChildSubCategory = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(expenseChildSubCategoryPayload.id);
        if (expenseChildSubCategory) {
            const updatedExpenseChildSubCategory = await this.modelClass
                .query()
                .update({
                name: expenseChildSubCategoryPayload.name ? expenseChildSubCategoryPayload.name : expenseChildSubCategory.name,
                description: expenseChildSubCategoryPayload.description ? expenseChildSubCategoryPayload.description : expenseChildSubCategory.description,
                updatedBy: currentUser.username,
            })
                .where({ id: expenseChildSubCategoryPayload.id });
            return {
                success: true,
                message: 'ExpenseChildSubCategory details updated successfully.',
                data: updatedExpenseChildSubCategory,
            };
        }
        else {
            return {
                success: false,
                message: 'No expenseChildSubCategory found.',
                data: {},
            };
        }
    }
    async deleteById(expenseChildSubCategoryId, currentUser) {
        const expenseChildSubCategories = await this.modelClass.query()
            .where({
            brandCode: currentUser.brandCode,
            id: expenseChildSubCategoryId
        })
            .delete();
        if (expenseChildSubCategories) {
            return {
                success: true,
                message: 'ExpenseChildSubCategory deleted successfully.',
                data: expenseChildSubCategories,
            };
        }
        else {
            return {
                success: false,
                message: 'No expenseChildSubCategory found.',
                data: {},
            };
        }
    }
};
ExpenseChildSubCategoriesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ExpenseChildSubCategoryModel')),
    __metadata("design:paramtypes", [Object, expenseSubCategories_service_1.ExpenseSubCategoriesService])
], ExpenseChildSubCategoriesService);
exports.ExpenseChildSubCategoriesService = ExpenseChildSubCategoriesService;
//# sourceMappingURL=expenseChildSubCategories.service.js.map