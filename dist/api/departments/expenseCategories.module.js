"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const expenseCategories_controller_1 = require("./expenseCategories.controller");
const expenseCategories_service_1 = require("./expenseCategories.service");
let ExpenseCategoriesModule = class ExpenseCategoriesModule {
};
ExpenseCategoriesModule = __decorate([
    common_1.Module({
        controllers: [expenseCategories_controller_1.ExpenseCategoriesController],
        providers: [expenseCategories_service_1.ExpenseCategoriesService],
        exports: [expenseCategories_service_1.ExpenseCategoriesService],
    })
], ExpenseCategoriesModule);
exports.ExpenseCategoriesModule = ExpenseCategoriesModule;
//# sourceMappingURL=expenseCategories.module.js.map