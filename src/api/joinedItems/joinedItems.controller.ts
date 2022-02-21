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
import { JoinedItemsService } from './joinedItems.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('joinedItems')
export class JoinedItemsController {
  constructor(
    private readonly joinedItemsService: JoinedItemsService,
    ) {}
  @Get()
  async findAll(@Request() req) {
    const joinedItems = await this.joinedItemsService.findAll(req.user);
    return joinedItems;
  }
  @Get('joinedExpenseCategories')
  async findAllExpenseCategories(@Request() req) {
    const joinedItems = await this.joinedItemsService.findAllExpenseCategories(req.user);
    return joinedItems;
  }
}
