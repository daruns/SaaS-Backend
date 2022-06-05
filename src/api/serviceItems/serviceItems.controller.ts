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
import { Can } from '../auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('serviceItems')
export class ServiceItemsController {
  constructor(
    private readonly serviceItemsService: ServiceItemsService,
    ) {}

  @Get()
  @Can(Subjects.financeServiceItems,Action.Read)
  async findAll(@Request() req) {
    const serviceItems = await this.serviceItemsService.findAll(req.user);
    return serviceItems;
  }

  @Get(':id')
  @Can(Subjects.financeServiceItems,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const serviceItem = await this.serviceItemsService.findById(id, req.user);
    return serviceItem;
  }

  @Post('create')
  @Can(Subjects.financeServiceItems,Action.Create)
  async create(@Body() serviceItem: CreateServiceItemDto, @Request() req) {
    const createdServiceItem = await this.serviceItemsService.create(serviceItem, req.user);
    return createdServiceItem
  }

  @Post('update')
  @Can(Subjects.financeServiceItems,Action.Update)
  // update commnet on serviceItem
  update(@Body() payload: UpdateServiceItemDto, @Request() req) {
    return this.serviceItemsService.update(payload, req.user);
  }

  @Post('delete')
  // delete serviceItem by id
  @Can(Subjects.financeServiceItems,Action.Delete)
  deleteById(@Body() payload, @Request() req) {
    return this.serviceItemsService.deleteById(payload.id, req.user);
  }
}
