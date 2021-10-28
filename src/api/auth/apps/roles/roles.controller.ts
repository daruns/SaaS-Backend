import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Post,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll(@Request() req) {
    const roles = await this.rolesService.findAll();
    return roles;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const post = await this.rolesService.findById(id);
    return post;
  }
  @Post('create')
  create(@Body() role: CreateRoleDto) {
    return this.rolesService.create(role);
  }

  @Post('update')
  update(@Body() role) {
    return this.rolesService.update(role);
  }

  @Post('delete')
  delete(@Body() role) {
    return this.rolesService.delete(role);
  }
}
