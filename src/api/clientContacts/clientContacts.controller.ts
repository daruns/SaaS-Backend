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
import { UpdateClientContactDto } from './dto/update-clientContact.dto';
import { ClientContactsService } from './clientContacts.service';
import { CreateClientContactDto } from './dto/create-clientContact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('clientContacts')
export class ClientContactsController {
  constructor(
    private readonly clientContactsService: ClientContactsService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const clientContacts = await this.clientContactsService.findAll(req.user);
    return clientContacts;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const clientContact = await this.clientContactsService.findById(id, req.user);
    return clientContact;
  }

  @Post('create')
  async create(@Body() clientContact: CreateClientContactDto, @Request() req) {
    const createdClientContact = await this.clientContactsService.create(clientContact, req.user);
    return createdClientContact
  }

  @Post('update')
  // update commnet on clientContact
  update(@Body() payload: UpdateClientContactDto, @Request() req) {
    return this.clientContactsService.update(payload, req.user);
  }

  @Post('delete')
  // delete clientContact by id
  deleteById(@Body() payload, @Request() req) {
    return this.clientContactsService.deleteById(payload.id, req.user);
  }
}
