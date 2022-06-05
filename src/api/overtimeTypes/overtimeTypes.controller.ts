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
import { UpdateOvertimeTypeDto } from './dto/update-overtimeType.dto';
import { OvertimeTypesService } from './overtimeTypes.service';
import { CreateOvertimeTypeDto } from './dto/create-overtimeType.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Can } from '../auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('overtimeTypes')
export class OvertimeTypesController {
  constructor(
    private readonly overtimeTypesService: OvertimeTypesService,
    ) {}

  @Get()
  @Can(Subjects.hrmOverTimeTypes,Action.Read)
  async findAll(@Request() req) {
    const overtimeTypes = await this.overtimeTypesService.findAll(req.user);
    return overtimeTypes;
  }

  @Get(':id')
  @Can(Subjects.hrmOverTimeTypes,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const overtimeType = await this.overtimeTypesService.findById(id, req.user);
    return overtimeType;
  }

  @Post('create')
  @Can(Subjects.hrmOverTimeTypes,Action.Create)
  async create(@Body() overtimeType: CreateOvertimeTypeDto, @Request() req) {
    const createdOvertimeType = await this.overtimeTypesService.create(overtimeType, req.user);
    return createdOvertimeType
  }

  @Post('update')
  @Can(Subjects.hrmOverTimeTypes,Action.Update)
  // update commnet on overtimeType
  update(@Body() payload: UpdateOvertimeTypeDto, @Request() req) {
    return this.overtimeTypesService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.hrmOverTimeTypes,Action.Delete)
  // delete overtimeType by id
  deleteById(@Body() payload, @Request() req) {
    return this.overtimeTypesService.deleteById(payload.id, req.user);
  }
}
