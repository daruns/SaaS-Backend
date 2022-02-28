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
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly departmentsService: DepartmentsService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const departments = await this.departmentsService.findAll(req.user);
    return departments;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const department = await this.departmentsService.findById(id, req.user);
    return department;
  }

  @Post('create')
  async create(@Body() department: CreateDepartmentDto, @Request() req) {
    const createdDepartment = await this.departmentsService.create(department, req.user);
    return createdDepartment
  }

  @Post('update')
  // update commnet on department
  update(@Body() payload: UpdateDepartmentDto, @Request() req) {
    return this.departmentsService.update(payload, req.user);
  }

  @Post('delete')
  // delete department by id
  deleteById(@Body() payload, @Request() req) {
    return this.departmentsService.deleteById(payload.id, req.user);
  }
}
