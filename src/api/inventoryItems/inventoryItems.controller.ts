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
import { UpdateInventoryItemDto } from './dto/update-inventoryItem.dto';
import { InventoryItemsService } from './inventoryItems.service';
import { CreateInventoryItemDto } from './dto/create-inventoryItem.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Can } from '../auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('inventoryItems')
export class InventoryItemsController {
  constructor(
    private readonly inventoryItemsService: InventoryItemsService,
    ) {}

  @Get()
  @Can(Subjects.financeExpensesCategories,Action.Read)
  async findAll(@Request() req) {
    const inventoryItems = await this.inventoryItemsService.findAll(req.user);
    return inventoryItems;
  }

  @Get(':id')
  @Can(Subjects.financeExpensesCategories,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const inventoryItem = await this.inventoryItemsService.findById(id, req.user);
    return inventoryItem;
  }

  @Post('create')
  @Can(Subjects.financeExpensesCategories,Action.Create)
  async create(@Body() inventoryItem: CreateInventoryItemDto, @Request() req) {
    const createdInventoryItem = await this.inventoryItemsService.create(inventoryItem, req.user);
    return createdInventoryItem
  }

  @Post('update')
  @Can(Subjects.financeExpensesCategories,Action.Update)
  update(@Body() payload: UpdateInventoryItemDto, @Request() req) {
    return this.inventoryItemsService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.financeExpensesCategories,Action.Delete)
  deleteById(@Body() payload, @Request() req) {
    return this.inventoryItemsService.deleteById(payload.id, req.user);
  }
}
