import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Post,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly postsService: ClientsService) {}

  @Get()
  async findAll() {
    const clients = await this.postsService.findAll();
    return clients;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const post = await this.postsService.findById(id);
    return post;
  }
  @Post()
  create(@Body() client: CreateClientDto) {
    return this.postsService.create(client);
  }
}
