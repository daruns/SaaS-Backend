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
import { UpdateDesignationDto } from './dto/update-designation.dto';
import { DesignationsService } from './designations.service';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('designations')
export class DesignationsController {
  constructor(
    private readonly designationsService: DesignationsService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const designations = await this.designationsService.findAll(req.user);
    return designations;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const designation = await this.designationsService.findById(id, req.user);
    return designation;
  }

  @Post('create')
  async create(@Body() designation: CreateDesignationDto, @Request() req) {
    const createdDesignation = await this.designationsService.create(designation, req.user);
    return createdDesignation
  }

  @Post('update')
  // update commnet on designation
  update(@Body() payload: UpdateDesignationDto, @Request() req) {
    return this.designationsService.update(payload, req.user);
  }

  @Post('delete')
  // delete designation by id
  deleteById(@Body() payload, @Request() req) {
    return this.designationsService.deleteById(payload.id, req.user);
  }
}
