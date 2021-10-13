import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const post = await this.usersService.findById(id);
    return post;
  }
  @Post('create')
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Post('update')
  update(@Body() user) {
    return this.usersService.update(user);
  }

  @Post('delete')
  delete(@Body() user: {id: number}) {
    return this.usersService.delete(user);
  }
}
