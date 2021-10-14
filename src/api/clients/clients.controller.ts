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
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateClientUserDto } from './dto/create-client-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const clients = await this.clientsService.findAll(req.user);
    return clients;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const client = await this.clientsService.findById(id, req.user);
    return client;
  }

  @Post('create')
  async create(@Body() client: CreateClientDto,@Body('user') user: CreateClientUserDto, @Request() req) {
    const createdClient = await this.clientsService.create(client, user, req.user);
    return createdClient
  }

  @Post('update')
  // update commnet on client
  update(@Body() payload: UpdateClientDto, @Request() req) {
    return this.clientsService.update(payload, req.user);
  }

  @Post('delete')
  // delete client by id
  deleteById(@Body() payload, @Request() req) {
    return this.clientsService.deleteById(payload.id, req.user);
  }
}
