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
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto, CreateExpenseItemDto } from './dto/create-expense.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const expenses = await this.expensesService.findAll(req.user);
    return expenses;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const expense = await this.expensesService.findById(id, req.user);
    return expense;
  }

  @Post('create')
  async create(@Body() expense: CreateExpenseDto,@Body('items') expenseItems: Array<CreateExpenseItemDto>, @Request() req) {
    delete (expense['items'])
    const createdExpense = await this.expensesService.create(expense, expenseItems, req.user);
    return createdExpense
  }

  @Post('update')
  // update commnet on expense
  update(@Body() payload: UpdateExpenseDto,@Body('items') expenseItems: Array<CreateExpenseItemDto>, @Request() req) {
    return this.expensesService.update(payload, expenseItems, req.user);
  }

  @Post('delete')
  // delete expense by id
  deleteById(@Body() payload, @Request() req) {
    return this.expensesService.deleteById(payload.id, req.user);
  }
}
