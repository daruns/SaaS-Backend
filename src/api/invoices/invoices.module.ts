import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { InventoryItemsService } from '../inventoryItems/inventoryItems.service';
import { NonInventoryItemsService } from '../nonInventoryItems/nonInventoryItems.service';
import { ServiceItemsService } from '../serviceItems/serviceItems.service';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

@Module({
  imports: [ClientsModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, InventoryItemsService, NonInventoryItemsService, ServiceItemsService],
})
export class InvoicesModule {}
