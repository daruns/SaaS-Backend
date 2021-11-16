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

@UseGuards(JwtAuthGuard)
@Controller('expenseCategories')
export class ExpenseCategoriesController {
  constructor(
    private readonly expenseCategoriesService: ExpenseCategoriesService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const expenseCategories = await this.expenseCategoriesService.findAll(req.user);
    return expenseCategories;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const expenseCategory = await this.expenseCategoriesService.findById(id, req.user);
    return expenseCategory;
  }

  @Post('create')
  async create(@Body() expenseCategory: CreateExpenseCategoryDto, @Request() req) {
    const createdExpenseCategory = await this.expenseCategoriesService.create(expenseCategory, req.user);
    return createdExpenseCategory
  }

  @Post('update')
  // update commnet on expenseCategory
  update(@Body() payload: UpdateExpenseCategoryDto, @Request() req) {
    return this.expenseCategoriesService.update(payload, req.user);
  }

  @Post('delete')
  // delete expenseCategory by id
  deleteById(@Body() payload, @Request() req) {
    return this.expenseCategoriesService.deleteById(payload.id, req.user);
  }
}
