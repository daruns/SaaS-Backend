"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../../app/app.service");
const expenseCategories_service_1 = require("../expenseCategories/expenseCategories.service");
const expenseSubCategories_service_1 = require("../expenseSubCategories/expenseSubCategories.service");
const paymentMethods_module_1 = require("../paymentMethods/paymentMethods.module");
const paymentMethods_service_1 = require("../paymentMethods/paymentMethods.service");
const suppliers_module_1 = require("../suppliers/suppliers.module");
const suppliers_service_1 = require("../suppliers/suppliers.service");
const taxes_module_1 = require("../taxes/taxes.module");
const taxes_service_1 = require("../taxes/taxes.service");
const expenses_controller_1 = require("./expenses.controller");
const expenses_service_1 = require("./expenses.service");
let ExpensesModule = class ExpensesModule {
};
ExpensesModule = __decorate([
    common_1.Module({
        imports: [suppliers_module_1.SuppliersModule, paymentMethods_module_1.PaymentMethodsModule, taxes_module_1.TaxesModule],
        controllers: [expenses_controller_1.ExpensesController],
        providers: [
            app_service_1.FileUploadService,
            expenses_service_1.ExpensesService,
            expenseCategories_service_1.ExpenseCategoriesService,
            expenseSubCategories_service_1.ExpenseSubCategoriesService,
            suppliers_service_1.SuppliersService,
            paymentMethods_service_1.PaymentMethodsService,
            taxes_service_1.TaxesService,
        ],
    })
], ExpensesModule);
exports.ExpensesModule = ExpensesModule;
//# sourceMappingURL=expenses.module.js.map