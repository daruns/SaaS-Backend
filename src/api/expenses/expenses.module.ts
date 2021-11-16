import { Module } from '@nestjs/common';
import { ExpenseCategoriesService } from '../expenseCategories/expenseCategories.service';
import { ExpenseSubCategoriesService } from '../expenseSubCategories/expenseSubCategories.service';
import { PaymentMethodsModule } from '../paymentMethods/paymentMethods.module';
import { PaymentMethodsService } from '../paymentMethods/paymentMethods.service';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { SuppliersService } from '../suppliers/suppliers.service';
import { TaxesModule } from '../taxes/taxes.module';
import { TaxesService } from '../taxes/taxes.service';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [SuppliersModule, PaymentMethodsModule, TaxesModule],
  controllers: [ExpensesController],
  providers: [
    ExpensesService,
    ExpenseCategoriesService,
    ExpenseSubCategoriesService,
    SuppliersService,
    PaymentMethodsService,
    TaxesService,
  ],
})
export class ExpensesModule {}
