import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { InventoryItemsService } from '../inventoryItems/inventoryItems.service';
import { NonInventoryItemsService } from '../nonInventoryItems/nonInventoryItems.service';
import { ServiceItemsService } from '../serviceItems/serviceItems.service';
import { QoutesController } from './qoutes.controller';
import { QoutesService } from './qoutes.service';

@Module({
  imports: [ClientsModule],
  controllers: [QoutesController],
  providers: [QoutesService, InventoryItemsService, NonInventoryItemsService, ServiceItemsService],
})
export class QoutesModule {}
