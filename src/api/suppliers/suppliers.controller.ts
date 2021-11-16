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
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const suppliers = await this.suppliersService.findAll(req.user);
    return suppliers;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const supplier = await this.suppliersService.findById(id, req.user);
    return supplier;
  }

  @Post('create')
  async create(@Body() supplier: CreateSupplierDto, @Request() req) {
    const createdSupplier = await this.suppliersService.create(supplier, req.user);
    return createdSupplier
  }

  @Post('update')
  // update commnet on supplier
  update(@Body() payload: UpdateSupplierDto, @Request() req) {
    return this.suppliersService.update(payload, req.user);
  }

  @Post('delete')
  // delete supplier by id
  deleteById(@Body() payload, @Request() req) {
    return this.suppliersService.deleteById(payload.id, req.user);
  }
}
