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
import { PayslipsService } from './payslips.service';
import { CreatePayslipDto } from './dto/create-payslip.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('payslips')
export class PayslipsController {
  constructor(
    private readonly payslipsService: PayslipsService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const payslips = await this.payslipsService.findAll(req.user);
    return payslips;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const payslip = await this.payslipsService.findById(id, req.user);
    return payslip;
  }

  @Post('create')
  async create(@Body() payslip: CreatePayslipDto, @Request() req) {
    const createdPayslip = await this.payslipsService.create(payslip, req.user);
    return createdPayslip
  }

  @Post('delete')
  // delete payslip by id
  deleteById(@Body() payload, @Request() req) {
    return this.payslipsService.deleteById(payload.id, req.user);
  }
}
