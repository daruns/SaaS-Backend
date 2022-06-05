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
import { UpdatePermissionDto } from './dto/update-permission.dto'
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { Subjects } from '../../can/enums/subjects.enum';
import { Action } from '../../can/enums/actions.enum';
import { Can } from '../../can/decorators/can.decorator';

@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @Can(Subjects.OwnerAllowed ,Action.Read)
  async findAll(@Request() req) {
    const permissions = await this.permissionsService.findAll(req.user);
    return permissions;
  }

  @Get(':id')
  @Can(Subjects.OwnerAllowed ,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const post = await this.permissionsService.findById(id, req.user);
    return post;
  }

  @Post('create')
  @Can(Subjects.OwnerAllowed ,Action.Create)
  create(@Body() payload: CreatePermissionDto, @Request() req) {
    return this.permissionsService.create(payload,req.user);
  }

  @Post('update')
  @Can(Subjects.OwnerAllowed ,Action.Update)
  update(@Body() payload: UpdatePermissionDto, @Request() req) {
    return this.permissionsService.update(payload,req.user);
  }

  @Post('delete')
  @Can(Subjects.OwnerAllowed ,Action.Delete)
  delete(@Body() payload, @Request() req) {
    return this.permissionsService.delete(payload, req.user);
  }
}
