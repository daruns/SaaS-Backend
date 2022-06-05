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
import { UpdateDeductionDto } from './dto/update-deduction.dto';
import { DeductionsService } from './deductions.service';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';
import { Can } from 'src/api/auth/can/decorators/can.decorator';

@UseGuards(JwtAuthGuard)
@Controller('deductions')
export class DeductionsController {
  constructor(
    private readonly deductionsService: DeductionsService,
  ) {}

  @Get()
  @Can(Subjects.payrollDeductions ,Action.Read)
  async findAll(@Request() req) {
    const deductions = await this.deductionsService.findAll(req.user);
    return deductions;
  }

  @Get(':id')
  @Can(Subjects.payrollDeductions ,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const deduction = await this.deductionsService.findById(id, req.user);
    return deduction;
  }

  @Post('create')
  @Can(Subjects.payrollDeductions ,Action.Create)
  async create(@Body() deduction: CreateDeductionDto, @Request() req) {
    const createdDeduction = await this.deductionsService.create(deduction, req.user);
    return createdDeduction
  }

  @Post('update')
  @Can(Subjects.payrollDeductions ,Action.Update)
  async update(@Body() payload: UpdateDeductionDto, @Request() req) {
    return this.deductionsService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.payrollDeductions ,Action.Delete)
  async deleteById(@Body() payload, @Request() req) {
    return this.deductionsService.deleteById(payload.id, req.user);
  }
}
