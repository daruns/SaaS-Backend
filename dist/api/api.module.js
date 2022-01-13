"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const clientContacts_module_1 = require("./clientContacts/clientContacts.module");
const clients_module_1 = require("./clients/clients.module");
const meetings_module_1 = require("./meetings/meetings.module");
const socialMedias_module_1 = require("./socialMedias/socialMedias.module");
const users_module_1 = require("./auth/apps/users/users.module");
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
const app_service_1 = require("../app/app.service");
const joinedItems_module_1 = require("./joinedItems/joinedItems.module");
const chats_module_1 = require("./chat/chats.module");
const socialMediaStudios_module_1 = require("./socialMediaStudios/socialMediaStudios.module");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            clients_module_1.ClientsModule,
            auth_module_1.AuthModule,
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
        ],
        providers: [],
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map