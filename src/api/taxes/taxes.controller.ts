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
import { UpdateTaxDto } from './dto/update-tax.dto';
import { TaxesService } from './taxes.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('taxes')
export class TaxesController {
  constructor(
    private readonly taxesService: TaxesService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const taxes = await this.taxesService.findAll(req.user);
    return taxes;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const tax = await this.taxesService.findById(id, req.user);
    return tax;
  }

  @Post('create')
  async create(@Body() tax: CreateTaxDto, @Request() req) {
    const createdTax = await this.taxesService.create(tax, req.user);
    return createdTax
  }

  @Post('update')
  // update commnet on tax
  update(@Body() payload: UpdateTaxDto, @Request() req) {
    return this.taxesService.update(payload, req.user);
  }

  @Post('delete')
  // delete tax by id
  deleteById(@Body() payload, @Request() req) {
    return this.taxesService.deleteById(payload.id, req.user);
  }
}
