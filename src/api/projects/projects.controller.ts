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

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const projects = await this.projectsService.findAll(req.user);
    return projects;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const project = await this.projectsService.findById(id, req.user);
    return project;
  }

  @Post('create')
  async create(@Body() project: CreateProjectDto, @Request() req) {
    const createdProject = await this.projectsService.create(project, req.user);
    return createdProject
  }

  @Post('addTeamLeaders')
  async addLeaders(@Body() payload: AddLeadersToProjectDto, @Request() req) {
    const addedTeamLeaders = await this.projectsService.addLeaders(payload, req.user);
    return addedTeamLeaders
  }

  @Post('addTeamMembers')
  async addMembers(@Body() payload: AddMembersToProjectDto, @Request() req) {
    const addedTeamMembers = await this.projectsService.addMembers(payload, req.user);
    return addedTeamMembers
  }

  @Post('removeTeamLeaders')
  async removeLeaders(@Body() payload: AddLeadersToProjectDto, @Request() req) {
    const removedTeamLeaders = await this.projectsService.removeLeaders(payload, req.user);
    return removedTeamLeaders
  }

  @Post('removeTeamMembers')
  async removeMembers(@Body() payload: AddMembersToProjectDto, @Request() req) {
    const removedTeamMembers = await this.projectsService.removeMembers(payload, req.user);
    return removedTeamMembers
  }

  @Post('addFile')
  @UseInterceptors(FilesInterceptor("files", 10))
  async addFile(@Body("id") id: number, @UploadedFiles() files, @Request() req) {
    const payload: AddFileDto = {id: id, files: files}
    console.log(payload)
    const addFiledExpense = await this.projectsService.addFile(payload, req.user);
    return addFiledExpense
  }

  @Post('replaceFiles')
  @UseInterceptors(FilesInterceptor("files", 10))
  async replaceFiles(@Body("id") id: number, @UploadedFiles() files, @Request() req) {
    const payload: AddFileDto = {id: id, files: files}
    console.log(payload)
    const addFiledExpense = await this.projectsService.replaceFiles(payload, req.user);
    return addFiledExpense
  }

  @Post('removeFile')
  async removeFile(@Body() body: {id: number, attachId: number}, @Request() req) {
    const addFiledExpense = await this.projectsService.removeFile(body, req.user);
    return addFiledExpense
  }

  @Post('update')
  // update commnet on project
  update(@Body() payload: UpdateProjectDto, @Request() req) {
    return this.projectsService.update(payload, req.user);
  }

  @Post('delete')
  // delete project by id
  deleteById(@Body() payload, @Request() req) {
    return this.projectsService.deleteById(payload.id, req.user);
  }
}
