import { Module } from '@nestjs/common';
import { ClientContactsService } from '../clientContacts/clientContacts.service';
import { ClientsModule } from '../clients/clients.module';
import { ClientsService } from '../clients/clients.service';
import { InventoryItemsService } from '../inventoryItems/inventoryItems.service';
import { NonInventoryItemsService } from '../nonInventoryItems/nonInventoryItems.service';
import { ServiceItemsService } from '../serviceItems/serviceItems.service';
import { SubServiceItemsService } from '../subServiceItems/subServiceItems.service';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

@Module({
  imports: [ClientsModule],
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    InventoryItemsService,
    NonInventoryItemsService,
    ServiceItemsService,
    SubServiceItemsService,
    ClientsService,
    ClientContactsService,
  ],
})
export class InvoicesModule {}
