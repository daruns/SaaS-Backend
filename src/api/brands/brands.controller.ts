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

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}
  
  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const brands = await this.brandsService.findAll();
    return brands;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const post = await this.brandsService.findById(id);
    return post;
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('/brandCode/:brandCode')
  async findByBrandCode(@Param('brandCode', new ParseIntPipe()) brandCode: string, @Request() req) {
    const post = await this.brandsService.findByBrandCode(brandCode);
    return post;
  }

  @Post('create')
  create(@Body() brand: CreateBrandDto) {
    return this.brandsService.create(brand);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
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
