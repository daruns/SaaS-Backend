import { Module } from '@nestjs/common';
import { NonInventoryItemsController } from './nonInventoryItems.controller';
import { NonInventoryItemsService } from './nonInventoryItems.service';

@Module({
  controllers: [NonInventoryItemsController],
  providers: [NonInventoryItemsService],
})
export class NonInventoryItemsMdoule {}
