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
import { UpdateExpenseCategoryDto } from './dto/update-expenseCategory.dto';
import { ExpenseCategoriesService } from './expenseCategories.service';
import { CreateExpenseCategoryDto } from './dto/create-expenseCategory.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Action } from '../auth/can/enums/actions.enum';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Can } from '../auth/can/decorators/can.decorator';

@UseGuards(JwtAuthGuard)
@Controller('expenseCategories')
export class ExpenseCategoriesController {
  constructor(
    private readonly expenseCategoriesService: ExpenseCategoriesService,
    ) {}

  @Get()
  @Can(Subjects.financeExpensesCategories ,Action.Read)
  async findAll(@Request() req) {
    const expenseCategories = await this.expenseCategoriesService.findAll(req.user);
    return expenseCategories;
  }

  @Get(':id')
  @Can(Subjects.financeExpensesCategories ,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const expenseCategory = await this.expenseCategoriesService.findById(id, req.user);
    return expenseCategory;
  }

  @Post('create')
  @Can(Subjects.financeExpensesCategories ,Action.Create)
  async create(@Body() expenseCategory: CreateExpenseCategoryDto, @Request() req) {
    const createdExpenseCategory = await this.expenseCategoriesService.create(expenseCategory, req.user);
    return createdExpenseCategory
  }

  @Post('update')
  // update commnet on expenseCategory
  @Can(Subjects.financeExpensesCategories ,Action.Update)
  update(@Body() payload: UpdateExpenseCategoryDto, @Request() req) {
    return this.expenseCategoriesService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.financeExpensesCategories ,Action.Delete)
  // delete expenseCategory by id
  deleteById(@Body() payload, @Request() req) {
    return this.expenseCategoriesService.deleteById(payload.id, req.user);
  }
}
