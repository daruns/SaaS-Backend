import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Put,
  Delete,
  Post,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { UpdateExpenseSubCategoryDto } from './dto/update-expenseSubCategory.dto';
import { ExpenseSubCategoriesService } from './expenseSubCategories.service';
import { CreateExpenseSubCategoryDto } from './dto/create-expenseSubCategory.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';
import { Can } from '../auth/can/decorators/can.decorator';

@UseGuards(JwtAuthGuard)
@Controller('expenseSubCategories')
export class ExpenseSubCategoriesController {
  constructor(
    private readonly expenseSubCategoriesService: ExpenseSubCategoriesService,
    ) {}

  @Get()
  @Can(Subjects.financeExpensesCategories,Action.Read)
  async findAll(@Request() req) {
    const expenseSubCategories = await this.expenseSubCategoriesService.findAll(req.user);
    return expenseSubCategories;
  }

  @Get(':id')
  @Can(Subjects.financeExpensesCategories,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const expenseSubCategory = await this.expenseSubCategoriesService.findById(id, req.user);
    return expenseSubCategory;
  }

  @Post('create')
  @Can(Subjects.financeExpensesCategories,Action.Create)
  async create(@Body() expenseSubCategory: CreateExpenseSubCategoryDto, @Request() req) {
    const createdExpenseSubCategory = await this.expenseSubCategoriesService.create(expenseSubCategory, req.user);
    return createdExpenseSubCategory
  }

  @Post('update')
  @Can(Subjects.financeExpensesCategories,Action.Update)
  update(@Body() payload: UpdateExpenseSubCategoryDto, @Request() req) {
    return this.expenseSubCategoriesService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.financeExpensesCategories,Action.Delete)
  deleteById(@Body() payload, @Request() req) {
    return this.expenseSubCategoriesService.deleteById(payload.id, req.user);
  }
}
