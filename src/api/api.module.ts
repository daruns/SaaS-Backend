import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientContactsModule } from './clientContacts/clientContacts.module';
import { ClientsModule } from './clients/clients.module';
import { MeetingsModule } from './meetings/meetings.module';
import { SocialMediasModule } from './socialMedias/socialMedias.module';
import { UsersModule } from 'src/api/auth/apps/users/users.module';
import { BrandsModule } from 'src/api/brands/brands.module';
import { InventoryItemsModule } from './inventoryItems/inventoryItems.module';
import { NonInventoryItemsModule } from './nonInventoryItems/nonInventoryItems.module';
import { ServiceItemsModule } from './serviceItems/serviceItems.module';
import { SubServiceItemsModule } from 'src/api/subServiceItems/subServiceItems.module';
import { InvoicesModule } from './invoices/invoices.module';
import { QuotesModule } from './qoutes/quotes.module';
import { ProjectsModule } from './projects/projects.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { ExpenseCategoriesModule } from './expenseCategories/expenseCategories.module';
import { ExpenseSubCategoriesModule } from './expenseSubCategories/expenseSubCategories.module';
import { TaxesModule } from './taxes/taxes.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { PaymentMethodsModule } from './paymentMethods/paymentMethods.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    UsersModule,
    ClientsModule,
    AuthModule,
    ClientContactsModule,
    MeetingsModule,
    SocialMediasModule,
    BrandsModule,
    InventoryItemsModule,
    NonInventoryItemsModule,
    ServiceItemsModule,
    SubServiceItemsModule,
    InvoicesModule,
    QuotesModule,
    ProjectsModule,
    BoardsModule,
    TasksModule,
    ExpenseCategoriesModule,
    ExpenseSubCategoriesModule,
    TaxesModule,
    SuppliersModule,
    PaymentMethodsModule,
    ExpensesModule,
  ],
  providers: [],
})
export class ApiModule {}
