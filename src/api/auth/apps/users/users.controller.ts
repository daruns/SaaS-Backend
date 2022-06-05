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
import { Can } from 'src/api/auth/can/decorators/can.decorator';
import { Subjects } from '../../can/enums/subjects.enum';
import { Action } from '../../can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // @Can(Subjects.masterUsers ,Action.Read)
  // async findAll(@Req() req) {
  //   const users = await this.usersService.findAll();
  //   return users;
  // }

  @Get('allWithBrand')
  @Can(Subjects.EveryoneAllowed, Action.Read)
  async allWithBrand(@Req() req) {
    const users = await this.usersService.allWithBrand(req.user);
    return users;
  }

  @Get('allWithBrandClients')
  @Can(Subjects.EveryoneAllowed, Action.Read)
  async allWithBrandClients(@Req() req) {
    const users = await this.usersService.allWithBrandClients(req.user);
    return users;
  }

  @Get('allWithBrandNoClients')
  @Can(Subjects.EveryoneAllowed, Action.Read)
  async allWithBrandNoClients(@Req() req) {
    const users = await this.usersService.allWithBrandNoClients(req.user);
    return users;
  }

  @Get(':id')
  @Can(Subjects.EveryoneAllowed, Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Req() req) {
    const post = await this.usersService.findById(id);
    return post;
  }

  @Post('create')
  @Can(Subjects.OwnerAllowed, Action.Create)
  @UseInterceptors(FileInterceptor("avatar"))
  create(@Body() user: CreateUserDto, @UploadedFile() file: Express.Multer.File, @Req() req) {
    user.avatar = file
    user.brandCode = req.user.brandCode
    return this.usersService.create(user, req.user);
  }

  @Post('update')
  @Can(Subjects.OwnerAllowed ,Action.Update)
  @UseInterceptors(FileInterceptor("avatar"))
  update(@Body() user: UpdateUserDto, @UploadedFile() file: Express.Multer.File, @Req() req) {
    user.avatar = file
    return this.usersService.update(user, req.user);
  }

  @Post('delete')
  @Can(Subjects.OwnerAllowed ,Action.Delete)
  delete(@Body() user, @Req() req) {
    return this.usersService.delete(user, req.user);
  }
}
