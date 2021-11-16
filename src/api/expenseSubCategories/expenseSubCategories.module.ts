import { Module } from '@nestjs/common';
import { ExpenseCategoriesModule } from '../expenseCategories/expenseCategories.module';
import { ExpenseSubCategoriesController } from './expenseSubCategories.controller';
import { ExpenseSubCategoriesService } from './expenseSubCategories.service';

@Module({
  imports: [ExpenseCategoriesModule],
  controllers: [ExpenseSubCategoriesController],
  providers: [ExpenseSubCategoriesService],
})
export class ExpenseSubCategoriesModule {}
