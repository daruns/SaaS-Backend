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

@UseGuards(JwtAuthGuard)
@Controller('attendances')
export class AttendancesController {
  constructor(
    private readonly attendancesService: AttendancesService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const attendances = await this.attendancesService.findAll(req.user);
    return attendances;
  }
  @Post('create')
  async create(@Request() req) {
    const createdAttendance = await this.attendancesService.create(req.user);
    return createdAttendance
  }
}
