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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ChangeBoardDto, UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddMembersToTaskDto } from './dto/add-membersToTask.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AddFileDto } from 'src/app/app.service';
import { Can } from '../auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Can(Subjects.projectsTasks,Action.Read)
  async findAll(@Request() req) {
    const tasks = await this.tasksService.findAll(req.user);
    return tasks;
  }

  @Get(':id')
  @Can(Subjects.projectsTasks,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const task = await this.tasksService.findById(id, req.user);
    return task;
  }

  @Post('create')
  @Can(Subjects.projectsTasks,Action.Create)
  async create(@Body() task: CreateTaskDto, @Request() req) {
    const createdTask = await this.tasksService.create(task, req.user);
    return createdTask
  }

  @Post('addTeamMembers')
  @Can(Subjects.projectsTasks,Action.Update)
  async addMembers(@Body() payload: AddMembersToTaskDto, @Request() req) {
    const createdTask = await this.tasksService.addMembers(payload, req.user);
    return createdTask
  }

  @Post('removeTeamMembers')
  @Can(Subjects.projectsTasks,Action.Delete)
  async removeMembers(@Body() payload: AddMembersToTaskDto, @Request() req) {
    const createdTask = await this.tasksService.removeMembers(payload, req.user);
    return createdTask
  }

  @Post('addFile')
  @Can(Subjects.projectsTasks,Action.Update)
  @UseInterceptors(FilesInterceptor("files", 25))
  async addFile(@Body("id") id: number, @UploadedFiles() files, @Request() req) {
    const payload: AddFileDto = {id: id, files: files}
    console.log(payload)
    const addFiledExpense = await this.tasksService.addFile(payload, req.user);
    return addFiledExpense
  }

  @Post('removeFile')
  @Can(Subjects.projectsTasks,Action.Delete)
  async removeFile(@Body() body: {id: number, attachId: number}, @Request() req) {
    const addFiledExpense = await this.tasksService.removeFile(body, req.user);
    return addFiledExpense
  }

  @Post('changeBoard')
  // changeBoard commnet on task
  @Can(Subjects.projectsTasks,Action.Update)
  changeBoard(@Body() payload: ChangeBoardDto, @Request() req) {
    return this.tasksService.changeBoard(payload, req.user);
  }

  @Post('update')
  // update commnet on task
  @Can(Subjects.projectsTasks,Action.Update)
  update(@Body() payload: UpdateTaskDto, @Request() req) {
    return this.tasksService.update(payload, req.user);
  }

  @Post('delete')
  // delete task by id
  @Can(Subjects.projectsTasks,Action.Delete)
  deleteById(@Body() payload, @Request() req) {
    return this.tasksService.deleteById(payload.id, req.user);
  }
}
