"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseChildSubCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const expenseCategories_service_1 = require("../expenseCategories/expenseCategories.service");
const expenseSubCategories_module_1 = require("../expenseSubCategories/expenseSubCategories.module");
const expenseSubCategories_service_1 = require("../expenseSubCategories/expenseSubCategories.service");
const expenseChildSubCategories_controller_1 = require("./expenseChildSubCategories.controller");
const expenseChildSubCategories_service_1 = require("./expenseChildSubCategories.service");
let ExpenseChildSubCategoriesModule = class ExpenseChildSubCategoriesModule {
};
ExpenseChildSubCategoriesModule = __decorate([
    common_1.Module({
        imports: [expenseSubCategories_module_1.ExpenseSubCategoriesModule],
        controllers: [expenseChildSubCategories_controller_1.ExpenseChildSubCategoriesController],
        providers: [expenseChildSubCategories_service_1.ExpenseChildSubCategoriesService, expenseSubCategories_service_1.ExpenseSubCategoriesService, expenseCategories_service_1.ExpenseCategoriesService],
    })
], ExpenseChildSubCategoriesModule);
exports.ExpenseChildSubCategoriesModule = ExpenseChildSubCategoriesModule;
//# sourceMappingURL=expenseChildSubCategories.module.js.map