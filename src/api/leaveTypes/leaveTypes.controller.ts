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
import { UpdateLeaveTypeDto } from './dto/update-leaveType.dto';
import { LeaveTypesService } from './leaveTypes.service';
import { CreateLeaveTypeDto } from './dto/create-leaveType.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Can } from '../auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('leaveTypes')
export class LeaveTypesController {
  constructor(
    private readonly leaveTypesService: LeaveTypesService,
    ) {}

  @Get()
  @Can(Subjects.hrmLeaveTypes,Action.Read)
  async findAll(@Request() req) {
    const leaveTypes = await this.leaveTypesService.findAll(req.user);
    return leaveTypes;
  }

  @Get(':id')
  @Can(Subjects.hrmLeaveTypes,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const leaveType = await this.leaveTypesService.findById(id, req.user);
    return leaveType;
  }

  @Post('create')
  @Can(Subjects.hrmLeaveTypes,Action.Create)
  async create(@Body() leaveType: CreateLeaveTypeDto, @Request() req) {
    const createdLeaveType = await this.leaveTypesService.create(leaveType, req.user);
    return createdLeaveType
  }

  @Post('update')
  @Can(Subjects.hrmLeaveTypes,Action.Update)
  update(@Body() payload: UpdateLeaveTypeDto, @Request() req) {
    return this.leaveTypesService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.hrmLeaveTypes,Action.Delete)
  deleteById(@Body() payload, @Request() req) {
    return this.leaveTypesService.deleteById(payload.id, req.user);
  }
}
