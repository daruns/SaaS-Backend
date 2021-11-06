import { Module } from '@nestjs/common';
import { ClientContactsService } from '../clientContacts/clientContacts.service';
import { ClientsModule } from '../clients/clients.module';
import { ClientsService } from '../clients/clients.service';
import { InventoryItemsService } from '../inventoryItems/inventoryItems.service';
import { NonInventoryItemsService } from '../nonInventoryItems/nonInventoryItems.service';
import { ServiceItemsService } from '../serviceItems/serviceItems.service';
import { QoutesController } from './qoutes.controller';
import { QoutesService } from './qoutes.service';

@Module({
  imports: [ClientsModule],
  controllers: [QoutesController],
  providers: [
    QoutesService,
    InventoryItemsService,
    NonInventoryItemsService,
    ServiceItemsService,
    ClientsService,
    ClientContactsService,
  ]
})
export class QoutesModule {}
