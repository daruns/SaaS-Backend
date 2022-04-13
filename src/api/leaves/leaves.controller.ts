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
import { UpdateApprovalDto, UpdateLeaveDto } from './dto/update-leave.dto';
import { LeavesService } from './leaves.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { getUserType } from 'src/app/app.service';
import { UserLayers } from '../auth/dto/user-layers.dto';

@UseGuards(JwtAuthGuard)
@Controller('leaves')
export class LeavesController {
  constructor(
    private readonly leavesService: LeavesService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const curUser = req?.user
    if (getUserType(curUser) === UserLayers.layerOne || getUserType(curUser) === UserLayers.layerTwo) {
      const leaves = await this.leavesService.findAll(req.user);
      return leaves;
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
    const leaveApprovals = await this.leavesService.findAllApprovals(req.user);
    return leaveApprovals
  }
  @Get('myLeaves')
  async findMyLeaves(@Request() req) {
    const myLeaves = await this.leavesService.findMyLeaves(req.user);
    return myLeaves
  }
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const leave = await this.leavesService.findById(id, req.user);
    return leave;
  }
  @Post('create')
  async create(@Body() leave: CreateLeaveDto, @Request() req) {
    const createdLeave = await this.leavesService.createLeave(leave, req.user);
    return createdLeave
  }
  @Post('updateApproval')
  // update commnet on leave
  updateApproval(@Body() payload: UpdateApprovalDto, @Request() req) {
    return this.leavesService.updateApproval(payload, req.user);
  }
  @Post('approveLeave')
  // update commnet on leave
  approveLeave(@Body() payload: UpdateApprovalDto, @Request() req) {
    return this.leavesService.approveLeave(payload, req.user);
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
