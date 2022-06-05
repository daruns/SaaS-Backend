"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const clientContacts_module_1 = require("./clientContacts/clientContacts.module");
const clients_module_1 = require("./clients/clients.module");
const meetings_module_1 = require("./meetings/meetings.module");
const socialMedias_module_1 = require("./socialMedias/socialMedias.module");
const users_module_1 = require("./auth/apps/users/users.module");
const permissions_module_1 = require("./auth/apps/permissions/permissions.module");
const brands_module_1 = require("./brands/brands.module");
const inventoryItems_module_1 = require("./inventoryItems/inventoryItems.module");
const nonInventoryItems_module_1 = require("./nonInventoryItems/nonInventoryItems.module");
const serviceItems_module_1 = require("./serviceItems/serviceItems.module");
const subServiceItems_module_1 = require("./subServiceItems/subServiceItems.module");
const invoices_module_1 = require("./invoices/invoices.module");
const quotes_module_1 = require("./qoutes/quotes.module");
const projects_module_1 = require("./projects/projects.module");
const boards_module_1 = require("./boards/boards.module");
const tasks_module_1 = require("./tasks/tasks.module");
const expenseCategories_module_1 = require("./expenseCategories/expenseCategories.module");
const expenseSubCategories_module_1 = require("./expenseSubCategories/expenseSubCategories.module");
const taxes_module_1 = require("./taxes/taxes.module");
const suppliers_module_1 = require("./suppliers/suppliers.module");
const paymentMethods_module_1 = require("./paymentMethods/paymentMethods.module");
const expenses_module_1 = require("./expenses/expenses.module");
const joinedItems_module_1 = require("./joinedItems/joinedItems.module");
const chats_module_1 = require("./chat/chats.module");
const socialMediaStudios_module_1 = require("./socialMediaStudios/socialMediaStudios.module");
const expenseChildSubCategories_module_1 = require("./expenseChildSubCategories/expenseChildSubCategories.module");
const departments_module_1 = require("./departments/departments.module");
const designations_module_1 = require("./designations/designations.module");
const employees_module_1 = require("./employees/employees.module");
const leaves_module_1 = require("./leaves/leaves.module");
const attendances_module_1 = require("./attendances/attendances.module");
const leaveTypes_module_1 = require("./leaveTypes/leaveTypes.module");
const overtimes_module_1 = require("./overtimes/overtimes.module");
const overtimeTypes_module_1 = require("./overtimeTypes/overtimeTypes.module");
const earningTypes_module_1 = require("./earningTypes/earningTypes.module");
const deductionTypes_module_1 = require("./deductionTypes/deductionTypes.module");
const earnings_module_1 = require("./earnings/earnings.module");
const deductions_module_1 = require("./deductions/deductions.module");
const payslips_module_1 = require("./payslips/payslips.module");
const can_module_1 = require("./auth/can/can.module");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            permissions_module_1.PermissionsModule,
            clients_module_1.ClientsModule,
            auth_module_1.AuthModule,
            can_module_1.CanModule,
            clientContacts_module_1.ClientContactsModule,
            meetings_module_1.MeetingsModule,
            socialMedias_module_1.SocialMediasModule,
            brands_module_1.BrandsModule,
            inventoryItems_module_1.InventoryItemsModule,
            nonInventoryItems_module_1.NonInventoryItemsModule,
            serviceItems_module_1.ServiceItemsModule,
            subServiceItems_module_1.SubServiceItemsModule,
            invoices_module_1.InvoicesModule,
            quotes_module_1.QuotesModule,
            projects_module_1.ProjectsModule,
            boards_module_1.BoardsModule,
            tasks_module_1.TasksModule,
            expenseCategories_module_1.ExpenseCategoriesModule,
            expenseSubCategories_module_1.ExpenseSubCategoriesModule,
            taxes_module_1.TaxesModule,
            suppliers_module_1.SuppliersModule,
            paymentMethods_module_1.PaymentMethodsModule,
            expenses_module_1.ExpensesModule,
            joinedItems_module_1.JoinedItemsModule,
            chats_module_1.ChatsModule,
            socialMediaStudios_module_1.SocialMediaStudiosModule,
            expenseChildSubCategories_module_1.ExpenseChildSubCategoriesModule,
            departments_module_1.DepartmentsModule,
            designations_module_1.DesignationsModule,
            employees_module_1.EmployeesModule,
            leaves_module_1.LeavesModule,
            leaveTypes_module_1.LeaveTypesModule,
            attendances_module_1.AttendancesModule,
            overtimes_module_1.OvertimesModule,
            overtimeTypes_module_1.OvertimeTypesModule,
            earningTypes_module_1.EarningTypesModule,
            earnings_module_1.EarningsModule,
            deductionTypes_module_1.DeductionTypesModule,
            deductions_module_1.DeductionsModule,
            payslips_module_1.PayslipModule,
        ],
        providers: [],
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map