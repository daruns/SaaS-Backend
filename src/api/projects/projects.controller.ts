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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
