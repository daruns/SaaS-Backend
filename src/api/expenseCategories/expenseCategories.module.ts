import { Module } from '@nestjs/common';
import { ExpenseCategoriesController } from './expenseCategories.controller';
import { ExpenseCategoriesService } from './expenseCategories.service';

@Module({
  controllers: [ExpenseCategoriesController],
  providers: [ExpenseCategoriesService],
  exports: [ExpenseCategoriesService],
})
export class ExpenseCategoriesModule {}
