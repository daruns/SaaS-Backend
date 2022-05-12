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

@UseGuards(JwtAuthGuard)
@Controller('deductionTypes')
export class DeductionTypesController {
  constructor(
    private readonly deductionTypesService: DeductionTypesService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const deductionTypes = await this.deductionTypesService.findAll(req.user);
    return deductionTypes;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const deductionType = await this.deductionTypesService.findById(id, req.user);
    return deductionType;
  }

  @Post('create')
  async create(@Body() deductionType: CreateDeductionTypeDto, @Request() req) {
    const createdDeductionType = await this.deductionTypesService.create(deductionType, req.user);
    return createdDeductionType
  }

  @Post('update')
  // update commnet on deductionType
  update(@Body() payload: UpdateDeductionTypeDto, @Request() req) {
    return this.deductionTypesService.update(payload, req.user);
  }

  @Post('delete')
  // delete deductionType by id
  deleteById(@Body() payload, @Request() req) {
    return this.deductionTypesService.deleteById(payload.id, req.user);
  }
}
