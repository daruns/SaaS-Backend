import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Post,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileParamDto } from "src/app/app.service";
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Action } from '../auth/can/enums/actions.enum';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Can } from '../auth/can/decorators/can.decorator';

@UseGuards(JwtAuthGuard)
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}
  
  @Get()
  @Can(Subjects.MasterAllowed ,Action.Read)
  async findAll(@Request() req) {
    const brands = await this.brandsService.findAll();
    return brands;
  }

  @Get(':id')
  @Can(Subjects.MasterAllowed ,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const post = await this.brandsService.findById(id);
    return post;
  }
  
  @Get('/brandCode/:brandCode')
  @Can(Subjects.MasterAllowed ,Action.Read)
  async findByBrandCode(@Param('brandCode', new ParseIntPipe()) brandCode: string, @Request() req) {
    const post = await this.brandsService.findByBrandCode(brandCode);
    return post;
  }

  @Post('create')
  @Can(Subjects.MasterAllowed ,Action.Create)
  create(@Body() brand: CreateBrandDto) {
    return this.brandsService.create(brand);
  }

  @Post('update')
  @Can(Subjects.MasterAllowed ,Action.Update)
  @UseInterceptors(FileInterceptor("logo"))    
  update(@Body() brand: UpdateBrandDto, @UploadedFile() file: Express.Multer.File, @Request() req) {
    brand.logo = file
    brand.id = Number(brand['id'])
    return this.brandsService.update(brand,req.user);
  }

  // @Post('delete')
  // delete(@Body() brand) {
  //   return this.brandsService.delete(brand);
  // }
}
