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
import { UpdateDeductionTypeDto } from './dto/update-deductionType.dto';
import { DeductionTypesService } from './deductionTypes.service';
import { CreateDeductionTypeDto } from './dto/create-deductionType.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Action } from '../auth/can/enums/actions.enum';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Can } from 'src/api/auth/can/decorators/can.decorator';

@UseGuards(JwtAuthGuard)
@Controller('deductionTypes')
export class DeductionTypesController {
  constructor(
    private readonly deductionTypesService: DeductionTypesService,
    ) {}

  @Get()
  @Can(Subjects.payrollDeductionTypes ,Action.Read)
  async findAll(@Request() req) {
    const deductionTypes = await this.deductionTypesService.findAll(req.user);
    return deductionTypes;
  }

  @Get(':id')
  @Can(Subjects.payrollDeductionTypes ,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const deductionType = await this.deductionTypesService.findById(id, req.user);
    return deductionType;
  }

  @Post('create')
  @Can(Subjects.payrollDeductionTypes ,Action.Create)
  async create(@Body() deductionType: CreateDeductionTypeDto, @Request() req) {
    const createdDeductionType = await this.deductionTypesService.create(deductionType, req.user);
    return createdDeductionType
  }

  @Post('update')
  @Can(Subjects.payrollDeductionTypes ,Action.Update)
  async update(@Body() payload: UpdateDeductionTypeDto, @Request() req) {
    return this.deductionTypesService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.payrollDeductionTypes ,Action.Delete)
  async deleteById(@Body() payload, @Request() req) {
    return this.deductionTypesService.deleteById(payload.id, req.user);
  }
}
