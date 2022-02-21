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
import { UpdateExpenseChildSubCategoryDto } from './dto/update-expenseChildSubCategory.dto';
import { ExpenseChildSubCategoriesService } from './expenseChildSubCategories.service';
import { CreateExpenseChildSubCategoryDto } from './dto/create-expenseChildSubCategory.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('expenseChildSubCategories')
export class ExpenseChildSubCategoriesController {
  constructor(
    private readonly expenseChildSubCategoriesService: ExpenseChildSubCategoriesService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const expenseChildSubCategories = await this.expenseChildSubCategoriesService.findAll(req.user);
    return expenseChildSubCategories;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const expenseChildSubCategory = await this.expenseChildSubCategoriesService.findById(id, req.user);
    return expenseChildSubCategory;
  }

  @Post('create')
  async create(@Body() expenseChildSubCategory: CreateExpenseChildSubCategoryDto, @Request() req) {
    const createdExpenseChildSubCategory = await this.expenseChildSubCategoriesService.create(expenseChildSubCategory, req.user);
    return createdExpenseChildSubCategory
  }

  @Post('update')
  // update commnet on expenseChildSubCategory
  update(@Body() payload: UpdateExpenseChildSubCategoryDto, @Request() req) {
    return this.expenseChildSubCategoriesService.update(payload, req.user);
  }

  @Post('delete')
  // delete expenseChildSubCategory by id
  deleteById(@Body() payload, @Request() req) {
    return this.expenseChildSubCategoriesService.deleteById(payload.id, req.user);
  }
}
