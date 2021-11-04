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
import { UpdateQouteDto } from './dto/update-qoute.dto';
import { QoutesService } from './qoutes.service';
import { CreateQouteDto, CreateQouteItemDto } from './dto/create-qoute.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('qoutes')
export class QoutesController {
  constructor(
    private readonly qoutesService: QoutesService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const qoutes = await this.qoutesService.findAll(req.user);
    return qoutes;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const qoute = await this.qoutesService.findById(id, req.user);
    return qoute;
  }

  @Post('create')
  async create(@Body() qoute: CreateQouteDto,@Body('items') qouteItems: CreateQouteItemDto[], @Request() req) {
    delete (qoute['items'])
    const createdQoute = await this.qoutesService.create(qoute, qouteItems, req.user);
    return createdQoute
  }

  @Post('update')
  // update commnet on qoute
  update(@Body() payload: UpdateQouteDto, @Request() req) {
    return this.qoutesService.update(payload, req.user);
  }

  @Post('delete')
  // delete qoute by id
  deleteById(@Body() payload, @Request() req) {
    return this.qoutesService.deleteById(payload.id, req.user);
  }
}
