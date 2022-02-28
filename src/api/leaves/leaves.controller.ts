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
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { LeavesService } from './leaves.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('leaves')
export class LeavesController {
  constructor(
    private readonly leavesService: LeavesService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const leaves = await this.leavesService.findAll(req.user);
    return leaves;
  }
  @Get('allApprovals')
  async findApprovals(@Request() req) {
    const leaves = await this.leavesService.findAllApproval(req.user);
    return leaves;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const leave = await this.leavesService.findById(id, req.user);
    return leave;
  }


  @Post('create')
  async create(@Body() leave: CreateLeaveDto, @Request() req) {
    const createdLeave = await this.leavesService.create(leave, req.user);
    return createdLeave
  }

  @Post('update')
  // update commnet on leave
  update(@Body() payload: UpdateLeaveDto, @Request() req) {
    return this.leavesService.update(payload, req.user);
  }

  @Post('delete')
  // delete leave by id
  deleteById(@Body() payload, @Request() req) {
    return this.leavesService.deleteById(payload.id, req.user);
  }
}
