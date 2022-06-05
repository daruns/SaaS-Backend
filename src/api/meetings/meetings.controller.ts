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
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Can } from '../auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('meetings')
export class MeetingsController {
  constructor(
    private readonly meetingsService: MeetingsService,
    ) {}

  @Get()
  @Can(Subjects.crmMeetings,Action.Read)
  async findAll(@Request() req) {
    const meetings = await this.meetingsService.findAll(req.user);
    return meetings;
  }

  @Get(':id')
  @Can(Subjects.crmMeetings,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const meeting = await this.meetingsService.findById(id, req.user);
    return meeting;
  }

  @Post('create')
  @Can(Subjects.crmMeetings,Action.Create)
  async create(@Body() meeting: CreateMeetingDto, @Request() req) {
    const createdMeeting = await this.meetingsService.create(meeting, req.user);
    return createdMeeting
  }

  @Post('update')
  @Can(Subjects.crmMeetings,Action.Update)
  update(@Body() payload: UpdateMeetingDto, @Request() req) {
    return this.meetingsService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.crmMeetings,Action.Delete)
  deleteById(@Body() payload, @Request() req) {
    return this.meetingsService.deleteById(payload.id, req.user);
  }
}
