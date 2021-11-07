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
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto, CreateQuoteItemDto } from './dto/create-quote.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('quotes')
export class QuotesController {
  constructor(
    private readonly quotesService: QuotesService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const quotes = await this.quotesService.findAll(req.user);
    return quotes;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const quote = await this.quotesService.findById(id, req.user);
    return quote;
  }

  @Post('create')
  async create(@Body() quote: CreateQuoteDto,@Body('items') quoteItems: CreateQuoteItemDto[], @Request() req) {
    delete (quote['items'])
    const createdQuote = await this.quotesService.create(quote, quoteItems, req.user);
    return createdQuote
  }

  @Post('update')
  // update commnet on quote
  update(@Body() payload: UpdateQuoteDto, @Request() req) {
    return this.quotesService.update(payload, req.user);
  }

  @Post('delete')
  // delete quote by id
  deleteById(@Body() payload, @Request() req) {
    return this.quotesService.deleteById(payload.id, req.user);
  }
}
