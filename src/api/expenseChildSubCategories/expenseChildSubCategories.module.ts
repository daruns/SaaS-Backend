import { Module } from '@nestjs/common';
import { ExpenseCategoriesService } from '../expenseCategories/expenseCategories.service';
import { ExpenseSubCategoriesModule } from '../expenseSubCategories/expenseSubCategories.module';
import { ExpenseSubCategoriesService } from '../expenseSubCategories/expenseSubCategories.service';
import { ExpenseChildSubCategoriesController } from './expenseChildSubCategories.controller';
import { ExpenseChildSubCategoriesService } from './expenseChildSubCategories.service'
@Module({
  imports: [ExpenseSubCategoriesModule],
  controllers: [ExpenseChildSubCategoriesController],
  providers: [ExpenseChildSubCategoriesService, ExpenseSubCategoriesService, ExpenseCategoriesService],
})
export class ExpenseChildSubCategoriesModule {}
