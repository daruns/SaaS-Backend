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
import { UpdateEarningDto } from './dto/update-earning.dto';
import { EarningsService } from './earnings.service';
import { CreateEarningDto } from './dto/create-earning.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Action } from '../auth/can/enums/actions.enum';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Can } from 'src/api/auth/can/decorators/can.decorator';

@UseGuards(JwtAuthGuard)
@Controller('earnings')
export class EarningsController {
  constructor(
    private readonly earningsService: EarningsService,
    ) {}

  @Get()
  @Can(Subjects.payrollEarnings ,Action.Read)
  async findAll(@Request() req) {
    const earnings = await this.earningsService.findAll(req.user);
    return earnings;
  }

  @Get(':id')
  @Can(Subjects.payrollEarnings ,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const earning = await this.earningsService.findById(id, req.user);
    return earning;
  }

  @Post('create')
  @Can(Subjects.payrollEarnings ,Action.Create)
  async create(@Body() earning: CreateEarningDto, @Request() req) {
    const createdEarning = await this.earningsService.create(earning, req.user);
    return createdEarning
  }

  @Post('update')
  @Can(Subjects.payrollEarnings ,Action.Update)
  update(@Body() payload: UpdateEarningDto, @Request() req) {
    return this.earningsService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.payrollEarnings ,Action.Delete)
  deleteById(@Body() payload, @Request() req) {
    return this.earningsService.deleteById(payload.id, req.user);
  }
}
