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
import { UpdateEarningTypeDto } from './dto/update-earningType.dto';
import { EarningTypesService } from './earningTypes.service';
import { CreateEarningTypeDto } from './dto/create-earningType.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('earningTypes')
export class EarningTypesController {
  constructor(
    private readonly earningTypesService: EarningTypesService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const earningTypes = await this.earningTypesService.findAll(req.user);
    return earningTypes;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const earningType = await this.earningTypesService.findById(id, req.user);
    return earningType;
  }

  @Post('create')
  async create(@Body() earningType: CreateEarningTypeDto, @Request() req) {
    const createdEarningType = await this.earningTypesService.create(earningType, req.user);
    return createdEarningType
  }

  @Post('update')
  // update commnet on earningType
  update(@Body() payload: UpdateEarningTypeDto, @Request() req) {
    return this.earningTypesService.update(payload, req.user);
  }

  @Post('delete')
  // delete earningType by id
  deleteById(@Body() payload, @Request() req) {
    return this.earningTypesService.deleteById(payload.id, req.user);
  }
}
