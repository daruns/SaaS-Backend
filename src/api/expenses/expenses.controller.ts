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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto, CreateExpenseItemDto } from './dto/create-expense.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { documentFileFilter, imageFileFilter } from 'src/app/app.service';
import { AddFileDto } from './dto/addFile.dto';

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

  @Post('addFile')
  @UseInterceptors(FilesInterceptor("files", 1, {fileFilter: documentFileFilter}))
  async addFile(@Body("id") id: number, @UploadedFiles() files, @Request() req) {
    const payload: AddFileDto = {id: id, files: files}
    console.log(payload)
    const addFiledExpense = await this.expensesService.addFile(payload, req.user);
    return addFiledExpense
  }

  @Post('replaceFiles')
  @UseInterceptors(FilesInterceptor("files", 1, {fileFilter: documentFileFilter}))
  async replaceFiles(@Body("id") id: number, @UploadedFiles() files, @Request() req) {
    const payload: AddFileDto = {id: id, files: files}
    console.log(payload)
    const addFiledExpense = await this.expensesService.replaceFiles(payload, req.user);
    return addFiledExpense
  }

  @Post('removeFile')
  async removeFile(@Body() body: {id: number, attachId: number}, @Request() req) {
    const addFiledExpense = await this.expensesService.removeFile(body, req.user);
    return addFiledExpense
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
