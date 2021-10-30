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
import { UpdateSubServiceItemDto } from './dto/update-subServiceItem.dto';
import { SubServiceItemsService } from './subServiceItems.service';
import { CreateSubServiceItemDto } from './dto/create-subServiceItem.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('subServiceItems')
export class SubServiceItemsController {
  constructor(
    private readonly subServiceItemsService: SubServiceItemsService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const subServiceItems = await this.subServiceItemsService.findAll(req.user);
    return subServiceItems;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const subServiceItem = await this.subServiceItemsService.findById(id, req.user);
    return subServiceItem;
  }

  @Post('create')
  async create(@Body() subServiceItem: CreateSubServiceItemDto, @Request() req) {
    const createdSubServiceItem = await this.subServiceItemsService.create(subServiceItem, req.user);
    return createdSubServiceItem
  }

  @Post('update')
  // update commnet on subServiceItem
  update(@Body() payload: UpdateSubServiceItemDto, @Request() req) {
    return this.subServiceItemsService.update(payload, req.user);
  }

  @Post('delete')
  // delete subServiceItem by id
  deleteById(@Body() payload, @Request() req) {
    return this.subServiceItemsService.deleteById(payload.id, req.user);
  }
}
