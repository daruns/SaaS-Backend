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
import { Can } from '../auth/can/decorators/can.decorator';
import { Subjects } from '../auth/can/enums/subjects.enum';
import { Action } from '../auth/can/enums/actions.enum';

@UseGuards(JwtAuthGuard)
@Controller('joinedItems')
export class JoinedItemsController {
  constructor(
    private readonly joinedItemsService: JoinedItemsService,
    ) {}
  @Get()
  @Can(Subjects.financeJoinedItems,Action.Read)
  async findAll(@Request() req) {
    const joinedItems = await this.joinedItemsService.findAll(req.user);
    return joinedItems;
  }
  @Get('joinedExpenseCategories')
  @Can(Subjects.financeJoinedExpenseCategories,Action.Read)
  async findAllExpenseCategories(@Request() req) {
    const joinedItems = await this.joinedItemsService.findAllExpenseCategories(req.user);
    return joinedItems;
  }
}
