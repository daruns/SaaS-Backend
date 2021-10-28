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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto'
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('users')
export class PermissionsController {
  constructor(private readonly usersService: PermissionsService) {}

  @Get()
  async findAll(@Request() req) {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const post = await this.usersService.findById(id);
    return post;
  }
  @Post('create')
  create(@Body() user: CreatePermissionDto) {
    return this.usersService.create(user);
  }

  @Post('update')
  update(@Body() user) {
    return this.usersService.update(user);
  }

  @Post('delete')
  delete(@Body() user) {
    return this.usersService.delete(user);
  }
}
