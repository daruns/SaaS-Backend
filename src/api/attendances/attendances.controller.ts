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

@UseGuards(JwtAuthGuard)
@Controller('attendances')
export class AttendancesController {
  constructor(
    private readonly attendancesService: AttendancesService,
    ) {}

  @Get()
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
  async create(@Request() req) {
    const createdAttendance = await this.attendancesService.create(req.user);
    return createdAttendance
  }
}
