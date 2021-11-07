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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddMembersToTaskDto } from './dto/add-membersToTask.dto';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const tasks = await this.tasksService.findAll(req.user);
    return tasks;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const task = await this.tasksService.findById(id, req.user);
    return task;
  }

  @Post('create')
  async create(@Body() task: CreateTaskDto, @Request() req) {
    const createdTask = await this.tasksService.create(task, req.user);
    return createdTask
  }

  @Post('addTeamMembers')
  async addMembers(@Body() payload: AddMembersToTaskDto, @Request() req) {
    const createdTask = await this.tasksService.addMembers(payload, req.user);
    return createdTask
  }

  @Post('removeTeamMembers')
  async removeMembers(@Body() payload: AddMembersToTaskDto, @Request() req) {
    const createdTask = await this.tasksService.removeMembers(payload, req.user);
    return createdTask
  }

  @Post('update')
  // update commnet on task
  update(@Body() payload: UpdateTaskDto, @Request() req) {
    return this.tasksService.update(payload, req.user);
  }

  @Post('delete')
  // delete task by id
  deleteById(@Body() payload, @Request() req) {
    return this.tasksService.deleteById(payload.id, req.user);
  }
}
