import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt-auth.guard';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}
  
  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const brands = await this.brandsService.findAll();
    return brands;
  }
  
  // @UseGuards(JwtAuthGuard)
  // @Get(':id')
  // async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
  //   const post = await this.brandsService.findById(id);
  //   return post;
  // }
  
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

  // @Post('update')
  // update(@Body() brand) {
  //   return this.brandsService.update(brand);
  // }

  // @Post('delete')
  // delete(@Body() brand) {
  //   return this.brandsService.delete(brand);
  // }
}
