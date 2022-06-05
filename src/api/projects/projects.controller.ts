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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddLeadersToProjectDto } from './dto/add-leadersToProject.dto';
import { AddMembersToProjectDto } from './dto/add-membersToProject.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AddFileDto } from 'src/app/app.service';
import { Can } from '../auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    ) {}

  @Get()
  @Can(Subjects.projects,Action.Read)
  async findAll(@Request() req) {
    const projects = await this.projectsService.findAll(req.user);
    return projects;
  }

  @Get('clients')
  @Can(Subjects.projects,Action.Read)
  async findAllClients(@Request() req) {
    const projectsClients = await this.projectsService.findAllClients(req.user);
    return projectsClients;
  }

  @Get('users')
  @Can(Subjects.projects,Action.Read)
  async findAllUsers(@Request() req) {
    const projectsUsers = await this.projectsService.findAllUsers(req.user);
    return projectsUsers;
  }

  @Get(':id')
  @Can(Subjects.projects,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const project = await this.projectsService.findById(id, req.user);
    return project;
  }

  @Post('create')
  @Can(Subjects.projects,Action.Create)
  async create(@Body() project: CreateProjectDto, @Request() req) {
    const createdProject = await this.projectsService.create(project, req.user);
    return createdProject
  }

  @Post('addTeamLeaders')
  @Can(Subjects.projects,Action.Create)
  async addLeaders(@Body() payload: AddLeadersToProjectDto, @Request() req) {
    const addedTeamLeaders = await this.projectsService.addLeaders(payload, req.user);
    return addedTeamLeaders
  }

  @Post('addTeamMembers')
  @Can(Subjects.projects,Action.Create)
  async addMembers(@Body() payload: AddMembersToProjectDto, @Request() req) {
    const addedTeamMembers = await this.projectsService.addMembers(payload, req.user);
    return addedTeamMembers
  }

  @Post('removeTeamLeaders')
  @Can(Subjects.projects,Action.Delete)
  async removeLeaders(@Body() payload: AddLeadersToProjectDto, @Request() req) {
    const removedTeamLeaders = await this.projectsService.removeLeaders(payload, req.user);
    return removedTeamLeaders
  }

  @Post('removeTeamMembers')
  @Can(Subjects.projects,Action.Delete)
  async removeMembers(@Body() payload: AddMembersToProjectDto, @Request() req) {
    const removedTeamMembers = await this.projectsService.removeMembers(payload, req.user);
    return removedTeamMembers
  }

  @Post('addFile')
  @Can(Subjects.projects,Action.Create)
  @UseInterceptors(FilesInterceptor("files", 10))
  async addFile(@Body("id") id: number, @UploadedFiles() files, @Request() req) {
    const payload: AddFileDto = {id: id, files: files}
    console.log(payload)
    const addFiledExpense = await this.projectsService.addFile(payload, req.user);
    return addFiledExpense
  }

  @Post('replaceFiles')
  @Can(Subjects.projects,Action.Update)
  @UseInterceptors(FilesInterceptor("files", 10))
  async replaceFiles(@Body("id") id: number, @UploadedFiles() files, @Request() req) {
    const payload: AddFileDto = {id: id, files: files}
    console.log(payload)
    const addFiledExpense = await this.projectsService.replaceFiles(payload, req.user);
    return addFiledExpense
  }

  @Post('removeFile')
  @Can(Subjects.projects,Action.Delete)
  async removeFile(@Body() body: {id: number, attachId: number}, @Request() req) {
    const addFiledExpense = await this.projectsService.removeFile(body, req.user);
    return addFiledExpense
  }

  @Post('update')
  @Can(Subjects.projects,Action.Update)
  // update commnet on project
  update(@Body() payload: UpdateProjectDto, @Request() req) {
    return this.projectsService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.projects,Action.Delete)
  // delete project by id
  deleteById(@Body() payload, @Request() req) {
    return this.projectsService.deleteById(payload.id, req.user);
  }
}
