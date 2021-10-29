import { Module } from '@nestjs/common';
import { InventoryItemsController } from './inventoryItems.controller';
import { InventoryItemsService } from './inventoryItems.service';

@Module({
  controllers: [InventoryItemsController],
  providers: [InventoryItemsService],
})
export class InventoryItemsMdoule {}
