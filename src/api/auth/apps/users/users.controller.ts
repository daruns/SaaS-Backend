import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Req() req) {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get('allWithBrand')
  async allWithBrand(@Req() req) {
    const users = await this.usersService.allWithBrand(req.user);
    return users;
  }

  @Get('allWithBrandClients')
  async allWithBrandClients(@Req() req) {
    const users = await this.usersService.allWithBrandClients(req.user);
    return users;
  }

  @Get('allWithBrandNoClients')
  async allWithBrandNoClients(@Req() req) {
    const users = await this.usersService.allWithBrandNoClients(req.user);
    return users;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Req() req) {
    const post = await this.usersService.findById(id);
    return post;
  }
  @Post('create')
  @UseInterceptors(FileInterceptor("avatar"))
  create(@Body() user: CreateUserDto, @UploadedFile() file: Express.Multer.File, @Req() req) {
    user.avatar = file
    user.brandCode = req.user.brandCode
    return this.usersService.create(user);
  }

  @Post('update')
  @UseInterceptors(FileInterceptor("avatar"))
  update(@Body() user: UpdateUserDto, @UploadedFile() file: Express.Multer.File, @Req() req) {
    user.avatar = file
    return this.usersService.update(user, req.user);
  }

  @Post('delete')
  delete(@Body() user) {
    return this.usersService.delete(user);
  }
}
