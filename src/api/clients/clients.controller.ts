import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
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

  @Post('update')
  // update commnet on post
  update(@Body() payload: UpdateClientDto) {
    return this.postsService.update(payload);
  }

  @Delete(':postId')
  // delete post by id
  deleteById(@Param('postId') postId: number) {
    return this.postsService.deleteById(postId);
  }
}
