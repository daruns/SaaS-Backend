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
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto, CreateQuoteItemDto } from './dto/create-quote.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Can } from '../auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('quotes')
export class QuotesController {
  constructor(
    private readonly quotesService: QuotesService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Can(Subjects.financeQuotes,Action.Read)
  async findAll(@Request() req) {
    const quotes = await this.quotesService.findAll(req.user);
    return quotes;
  }

  @Get(':id')
  @Can(Subjects.financeQuotes,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const quote = await this.quotesService.findById(id, req.user);
    return quote;
  }

  @Post('create')
  @Can(Subjects.financeQuotes,Action.Create)
  async create(@Body() quote: CreateQuoteDto,@Body('items') quoteItems: CreateQuoteItemDto[], @Request() req) {
    delete (quote['items'])
    const createdQuote = await this.quotesService.create(quote, quoteItems, req.user);
    return createdQuote
  }

  @Post('update')
  @Can(Subjects.financeQuotes,Action.Update)
  // update commnet on quote
  update(@Body() payload: UpdateQuoteDto, @Body('items') quoteItems: CreateQuoteItemDto[], @Request() req) {
    delete (payload['items'])
    return this.quotesService.update(payload, quoteItems, req.user);
  }

  @Post('delete')
  // delete quote by id
  @Can(Subjects.financeQuotes,Action.Delete)
  deleteById(@Body() payload, @Request() req) {
    return this.quotesService.deleteById(payload.id, req.user);
  }
}
