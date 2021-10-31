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
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const invoices = await this.invoicesService.findAll(req.user);
    return invoices;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const invoice = await this.invoicesService.findById(id, req.user);
    return invoice;
  }

  @Post('create')
  async create(@Body() invoice,@Body('items') invoiceItems, @Request() req) {
    delete(invoice['items'])
    const createdInvoice = await this.invoicesService.create(invoice, invoiceItems, req.user);
    return createdInvoice
  }

  @Post('update')
  // update commnet on invoice
  update(@Body() payload: UpdateInvoiceDto, @Request() req) {
    return this.invoicesService.update(payload, req.user);
  }

  @Post('delete')
  // delete invoice by id
  deleteById(@Body() payload, @Request() req) {
    return this.invoicesService.deleteById(payload.id, req.user);
  }
}
