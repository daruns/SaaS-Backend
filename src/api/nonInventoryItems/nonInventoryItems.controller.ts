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
import { UpdateNonInventoryItemDto } from './dto/update-nonInventoryItem.dto';
import { NonInventoryItemsService } from './nonInventoryItems.service';
import { CreateNonInventoryItemDto } from './dto/create-nonInventoryItem.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Can } from '../auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('nonInventoryItems')
export class NonInventoryItemsController {
  constructor(
    private readonly nonInventoryItemsService: NonInventoryItemsService,
    ) {}

  @Get()
  @Can(Subjects.financeNonInventoryItems,Action.Read)
  async findAll(@Request() req) {
    const nonInventoryItems = await this.nonInventoryItemsService.findAll(req.user);
    return nonInventoryItems;
  }

  @Get(':id')
  @Can(Subjects.financeNonInventoryItems,Action.Read)
  async findOne(@Param('id', new ParseIntPipe()) id: number, @Request() req) {
    const nonInventoryItem = await this.nonInventoryItemsService.findById(id, req.user);
    return nonInventoryItem;
  }

  @Post('create')
  @Can(Subjects.financeNonInventoryItems,Action.Create)
  async create(@Body() nonInventoryItem: CreateNonInventoryItemDto, @Request() req) {
    const createdNonInventoryItem = await this.nonInventoryItemsService.create(nonInventoryItem, req.user);
    return createdNonInventoryItem
  }

  @Post('update')
  @Can(Subjects.financeNonInventoryItems,Action.Update)
  // update commnet on nonInventoryItem
  update(@Body() payload: UpdateNonInventoryItemDto, @Request() req) {
    return this.nonInventoryItemsService.update(payload, req.user);
  }

  @Post('delete')
  @Can(Subjects.financeNonInventoryItems,Action.Delete)
  // delete nonInventoryItem by id
  deleteById(@Body() payload, @Request() req) {
    return this.nonInventoryItemsService.deleteById(payload.id, req.user);
  }
}
