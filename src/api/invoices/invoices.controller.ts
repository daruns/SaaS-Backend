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
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto, CreateInvoiceItemDto } from './dto/create-invoice.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Can } from '../auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Can(Subjects.financeInvoices,Action.Read)
  async findAll(@Request() req) {
    const invoices = await this.invoicesService.findAll(req.user);
    return invoices;
  }

  @Get(':id')
  @Can(Subjects.financeInvoices,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const invoice = await this.invoicesService.findById(id, req.user);
    return invoice;
  }

  @Post('create')
  @Can(Subjects.financeInvoices,Action.Create)
  async create(@Body() invoice: CreateInvoiceDto,@Body('items') invoiceItems: CreateInvoiceItemDto[], @Request() req) {
    delete (invoice['items'])
    const createdInvoice = await this.invoicesService.create(invoice, invoiceItems, req.user);
    return createdInvoice
  }

  @Post('update')
  @Can(Subjects.financeInvoices,Action.Update)
  update(@Body() payload: UpdateInvoiceDto, @Body('items') invoiceItems: CreateInvoiceItemDto[], @Request() req) {
    delete (payload['items'])
    return this.invoicesService.update(payload, invoiceItems, req.user);
  }

  @Post('delete')
  @Can(Subjects.financeInvoices,Action.Delete)
  deleteById(@Body() payload, @Request() req) {
    return this.invoicesService.deleteById(payload.id, req.user);
  }
}
