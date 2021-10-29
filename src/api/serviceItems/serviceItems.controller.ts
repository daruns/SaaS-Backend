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
import { UpdateServiceItemDto } from './dto/update-serviceItem.dto';
import { ServiceItemsService } from './serviceItems.service';
import { CreateServiceItemDto } from './dto/create-serviceItem.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('serviceItems')
export class ServiceItemsController {
  constructor(
    private readonly serviceItemsService: ServiceItemsService,
    ) {}

  @Get()
  async findAll(@Request() req) {
    const serviceItems = await this.serviceItemsService.findAll(req.user);
    return serviceItems;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const serviceItem = await this.serviceItemsService.findById(id, req.user);
    return serviceItem;
  }

  @Post('create')
  async create(@Body() serviceItem: CreateServiceItemDto, @Request() req) {
    const createdServiceItem = await this.serviceItemsService.create(serviceItem, req.user);
    return createdServiceItem
  }

  @Post('update')
  // update commnet on serviceItem
  update(@Body() payload: UpdateServiceItemDto, @Request() req) {
    return this.serviceItemsService.update(payload, req.user);
  }

  @Post('delete')
  // delete serviceItem by id
  deleteById(@Body() payload, @Request() req) {
    return this.serviceItemsService.deleteById(payload.id, req.user);
  }
}
