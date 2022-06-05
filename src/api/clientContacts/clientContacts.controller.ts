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
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';
import { Can } from 'src/api/auth/can/decorators/can.decorator';

@UseGuards(JwtAuthGuard)
@Controller('clientContacts')
export class ClientContactsController {
  constructor(
    private readonly clientContactsService: ClientContactsService,
    ) {}

  @Get()
  @Can(Subjects.crmClientContacts ,Action.Read)
  async findAll(@Request() req) {
    const clientContacts = await this.clientContactsService.findAll(req.user);
    return clientContacts;
  }

  @Get(':id')
  @Can(Subjects.crmClientContacts ,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const clientContact = await this.clientContactsService.findById(id, req.user);
    return clientContact;
  }

  @Post('create')
  @Can(Subjects.crmClientContacts ,Action.Create)
  async create(@Body() clientContact: CreateClientContactDto, @Request() req) {
    const createdClientContact = await this.clientContactsService.create(clientContact, req.user);
    return createdClientContact
  }

  @Post('update')
  @Can(Subjects.crmClientContacts ,Action.Update)
  async update(@Body() payload: UpdateClientContactDto, @Request() req) {
    return this.clientContactsService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.crmClientContacts ,Action.Delete)
  async deleteById(@Body() payload, @Request() req) {
    return this.clientContactsService.deleteById(payload.id, req.user);
  }
}
