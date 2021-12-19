"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const expenseCategories_module_1 = require("../expenseCategories/expenseCategories.module");
const expenseSubCategories_controller_1 = require("./expenseSubCategories.controller");
const expenseSubCategories_service_1 = require("./expenseSubCategories.service");
let ExpenseSubCategoriesModule = class ExpenseSubCategoriesModule {
};
ExpenseSubCategoriesModule = __decorate([
    common_1.Module({
        imports: [expenseCategories_module_1.ExpenseCategoriesModule],
        controllers: [expenseSubCategories_controller_1.ExpenseSubCategoriesController],
        providers: [expenseSubCategories_service_1.ExpenseSubCategoriesService],
    })
], ExpenseSubCategoriesModule);
exports.ExpenseSubCategoriesModule = ExpenseSubCategoriesModule;
//# sourceMappingURL=expenseSubCategories.module.js.map