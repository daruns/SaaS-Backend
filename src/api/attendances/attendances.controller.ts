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
import { AttendancesService } from './attendances.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { getUserType } from 'src/app/app.service';
import { UserLayers } from '../auth/dto/user-layers.dto';
import { Can } from '../auth/can/decorators/can.decorator';
import { Action } from '../auth/can/enums/actions.enum';
import { Subjects } from '../auth/can/enums/subjects.enum';

@UseGuards(JwtAuthGuard)
@Controller('attendances')
export class AttendancesController {
  constructor(
    private readonly attendancesService: AttendancesService,
    ) {}

  @Get()
  @Can(Subjects.hrmAttendances ,Action.Read)
  async findAll(@Request() req) {
    const curUser = req?.user
    if (getUserType(curUser) === UserLayers.layerOne || (curUser.myEmployeeProfile && curUser.myEmployeeProfile.hrMember === 1)) {
      const attendances = await this.attendancesService.findAll(req.user);
      return attendances
    }

    const attendancesByUser = await this.attendancesService.findAllByUser(req.user);
    return attendancesByUser;
  }
  @Post('create')
  @Can(Subjects.hrmAttendances ,Action.Create)
  async create(@Request() req) {
    const createdAttendance = await this.attendancesService.create(req.user);
    return createdAttendance
  }
}
