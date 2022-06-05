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
  UploadedFile,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileParamDto, imageFileFilter } from "src/app/app.service";
import { UsersService } from '../auth/apps/users/users.service';
import { UserLayers } from '../auth/dto/user-layers.dto';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';
import { Can } from '../auth/can/decorators/can.decorator';

@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @Can(Subjects.hrmEmployees ,Action.Read)
  async findAll(@Request() req) {
    const employees = await this.employeesService.findAll(req.user);
    return employees;
  }

  @Get('users')
  @Can(Subjects.hrmEmployees ,Action.Read)
  async findUsers(@Request() req) {
    const users = await this.employeesService.findUsers(req.user);
    return users;
  }

  @Get('me')
  @Can(Subjects.hrmEmployees ,Action.Read)
  async findMe(@Request() req) {
    const employee = await this.employeesService.findMe(req.user);
    return employee;
  }

  @Get(':id')
  @Can(Subjects.hrmEmployees ,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const employee = await this.employeesService.findById(id, req.user);
    return employee;
  }

  @Post('create')
  @Can(Subjects.hrmEmployees ,Action.Create)
  async create(@Body() payload: CreateEmployeeDto, @Request() req) {
    const createdEmployee = await this.employeesService.create(payload, req.user);
    return createdEmployee
  }

  @Post('update')
  // update commnet on employee
  @Can(Subjects.hrmEmployees ,Action.Update)
  update(@Body() payload: UpdateEmployeeDto, @Request() req) {
    if (payload.id) payload.id = Number(payload.id)
    if (payload.designationId) payload.designationId = Number(payload.designationId)
    if (payload.managerId) payload.managerId = Number(payload.managerId)
    return this.employeesService.update(payload, req.user);
  }

  @Post('updateAvatar')
  @Can(Subjects.hrmEmployees ,Action.Update)
  @UseInterceptors(FileInterceptor("avatar", { fileFilter: imageFileFilter}))
  async editProfile( @Body() payload: {id: number, avatar: string|FileParamDto}, @UploadedFile() file: Express.Multer.File, @Req() req) {
    if (payload.id) payload.id = Number(payload.id)
    payload.avatar = file
    const currentEmployee = await this.employeesService.findByUSerId(req.user?.id, req.user);
    if (currentEmployee.success && currentEmployee.data?.hrMember) {
      return this.usersService.update(payload, req.user);
    } else throw new UnauthorizedException()
  }

  @Post('delete')
  // delete employee by id
  @Can(Subjects.hrmEmployees ,Action.Delete)
  deleteById(@Body() payload: {id: number}, @Request() req) {
    return this.employeesService.deleteById(payload, req.user);
  }
}
