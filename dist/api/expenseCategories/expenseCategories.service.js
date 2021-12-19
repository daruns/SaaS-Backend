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
const common_1 = require("@nestjs/common");
const expenseCategory_model_1 = require("../../database/models/expenseCategory.model");
let ExpenseCategoriesService = class ExpenseCategoriesService {
    constructor(modelClass) {
        this.modelClass = modelClass;
    }
    async findAll(currentUser) {
        const expenseCategories = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .withGraphFetched({
            expenseSubCategories: {}
        });
        return {
            success: true,
            message: 'InventoryItem details fetch successfully.',
            data: expenseCategories,
        };
    }
    async findById(id, currentUser) {
        const CUser = currentUser;
        const expenseCategory = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(id)
            .withGraphFetched({
            expenseSubCategories: {}
        });
        if (expenseCategory) {
            return {
                success: true,
                message: 'ExpenseCategory details fetch successfully.',
                data: expenseCategory,
            };
        }
        else {
            return {
                success: false,
                message: 'No expenseCategory details found.',
                data: {},
            };
        }
    }
    async create(payload, currentUser) {
        const CUser = currentUser;
        const expenseCategoryPayload = payload;
        const newExpenseCategory = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findOne({
            name: expenseCategoryPayload.name
        });
        if (!newExpenseCategory) {
            expenseCategoryPayload['createdBy'] = currentUser.username;
            expenseCategoryPayload['brandCode'] = currentUser.brandCode;
            const identifiers = await this.modelClass.query().insert(expenseCategoryPayload);
            const createExpenseCategory = await this.modelClass.query().findById(identifiers.id);
            return {
                success: true,
                message: 'ExpenseCategory created successfully.',
                data: createExpenseCategory,
            };
        }
        else {
            return {
                success: false,
                message: 'ExpenseCategory already exists with this name!!!',
                data: {},
            };
        }
    }
    async update(payload, currentUser) {
        const CUser = currentUser;
        const expenseCategoryPayload = payload;
        const expenseCategory = await this.modelClass.query()
            .where({ brandCode: currentUser.brandCode })
            .findById(expenseCategoryPayload.id);
        if (expenseCategory) {
            const updatedExpenseCategory = await this.modelClass
                .query()
                .update({
                name: expenseCategoryPayload.name ? expenseCategoryPayload.name : expenseCategory.name,
                description: expenseCategoryPayload.description ? expenseCategoryPayload.description : expenseCategory.description,
                updatedBy: currentUser.username,
            })
                .where({ id: expenseCategoryPayload.id });
            return {
                success: true,
                message: 'ExpenseCategory details updated successfully.',
                data: updatedExpenseCategory,
            };
        }
        else {
            return {
                success: false,
                message: 'No expenseCategory found.',
                data: {},
            };
        }
    }
    async deleteById(expenseCategoryId, currentUser) {
        const CUser = currentUser;
        const expenseCategories = await this.modelClass.query()
            .where({
            brandCode: CUser.brandCode,
            id: expenseCategoryId
        })
            .delete();
        if (expenseCategories) {
            return {
                success: true,
                message: 'ExpenseCategory deleted successfully.',
                data: expenseCategories,
            };
        }
        else {
            return {
                success: false,
                message: 'No expenseCategory found.',
                data: {},
            };
        }
    }
};
ExpenseCategoriesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ExpenseCategoryModel')),
    __metadata("design:paramtypes", [Object])
], ExpenseCategoriesService);
exports.ExpenseCategoriesService = ExpenseCategoriesService;
//# sourceMappingURL=expenseCategories.service.js.map