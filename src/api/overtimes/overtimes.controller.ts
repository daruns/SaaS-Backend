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
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateApprovalDto, UpdateOvertimeDto } from './dto/update-overtime.dto';
import { OvertimesService } from './overtimes.service';
import { CreateOvertimeDto } from './dto/create-overtime.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { getUserType } from 'src/app/app.service';
import { UserLayers } from '../auth/dto/user-layers.dto';

@UseGuards(JwtAuthGuard)
@Controller('overtimes')
export class OvertimesController {
  constructor(
    private readonly overtimesService: OvertimesService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const curUser = req?.user
    if (getUserType(curUser) === UserLayers.layerOne || getUserType(curUser) === UserLayers.layerTwo) {
      const overtimes = await this.overtimesService.findAll(req.user);
      return overtimes;
    } else {
      return {
        success: false,
        message: "Not authorized in this field",
        data: [],
      }
    }
  }
  @Get('allApprovals')
  async findApprovals(@Request() req) {
    const overtimeApprovals = await this.overtimesService.findAllApprovals(req.user);
    return overtimeApprovals
  }
  @Get('myOvertimes')
  async findMyOvertimes(@Request() req) {
    const myOvertimes = await this.overtimesService.findMyOvertimes(req.user);
    return myOvertimes
  }
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const overtime = await this.overtimesService.findById(id, req.user);
    return overtime;
  }
  @Post('create')
  async create(@Body() overtime: CreateOvertimeDto, @Request() req) {
    const createdOvertime = await this.overtimesService.createOvertime(overtime, req.user);
    return createdOvertime
  }
  @Post('updateApproval')
  // update commnet on overtime
  updateApproval(@Body() payload: UpdateApprovalDto, @Request() req) {
    return this.overtimesService.updateApproval(payload, req.user);
  }
  @Post('approveOvertime')
  // update commnet on overtime
  approveOvertime(@Body() payload: UpdateApprovalDto, @Request() req) {
    return this.overtimesService.approveOvertime(payload, req.user);
  }
  @Post('update')
  // update commnet on overtime
  update(@Body() payload: UpdateOvertimeDto, @Request() req) {
    return this.overtimesService.update(payload, req.user);
  }
  @Post('delete')
  // delete overtime by id
  deleteById(@Body() payload, @Request() req) {
    return this.overtimesService.deleteById(payload.id, req.user);
  }
}
