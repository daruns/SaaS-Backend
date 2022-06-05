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
} from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateClientUserDto } from './dto/create-client-user.dto';
import { UpdateClientUserDto } from './dto/update-client-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';
import { Can } from 'src/api/auth/can/decorators/can.decorator';

@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    ) {}

  @Get()
  @Can(Subjects.crm,Action.Read)
  async findAll(@Request() req) {
    const clients = await this.clientsService.findAll(req.user);
    return clients;
  }

  @Get(':id')
  @Can(Subjects.crm,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const client = await this.clientsService.findById(id, req.user);
    return client;
  }

  @Post('create')
  @Can(Subjects.crm,Action.Create)
  @UseInterceptors(FileInterceptor("logo"))
  async create(@Body() payload: CreateClientDto, @UploadedFile() file: Express.Multer.File, @Request() req) {
    payload.logo = file
    const createdClient = await this.clientsService.create(payload, req.user);
    return createdClient
  }

  @Post('update')
  @Can(Subjects.crm,Action.Update)
  @UseInterceptors(FileInterceptor("logo"))
  async update(@Body() payload: UpdateClientDto, @UploadedFile() file: Express.Multer.File, @Request() req) {
    payload.logo = file
    payload.id = Number(payload.id)
    return this.clientsService.update(payload, req.user);
  }

  @Post('addUser')
  @Can(Subjects.crmUsers,Action.Create)
  async addUser(@Body() clientUser: CreateClientUserDto, @Request() req) {
    const addedUser = await this.clientsService.addUser(clientUser, req.user);
    return addedUser
  }

  @Post('editUser')
  @Can(Subjects.crmUsers,Action.Update)
  async editUser(@Body() payload: UpdateClientUserDto, @Request() req) {
    return this.clientsService.editUser(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.crm,Action.Delete)
  async deleteById(@Body() payload: {id: number}, @Request() req) {
    return this.clientsService.deleteById(payload, req.user);
  }

  @Post('removeUser')
  @Can(Subjects.crmUsers,Action.Delete)
  async removeUser(@Body() payload: {id: number, userId: number}, @Request() req) {
    return this.clientsService.removeUser(payload, req.user);
  }
}
