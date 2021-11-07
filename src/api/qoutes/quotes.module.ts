import { Module } from '@nestjs/common';
import { ClientContactsService } from '../clientContacts/clientContacts.service';
import { ClientsModule } from '../clients/clients.module';
import { ClientsService } from '../clients/clients.service';
import { InventoryItemsService } from '../inventoryItems/inventoryItems.service';
import { NonInventoryItemsService } from '../nonInventoryItems/nonInventoryItems.service';
import { ServiceItemsService } from '../serviceItems/serviceItems.service';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

@Module({
  imports: [ClientsModule],
  controllers: [QuotesController],
  providers: [
    QuotesService,
    InventoryItemsService,
    NonInventoryItemsService,
    ServiceItemsService,
    ClientsService,
    ClientContactsService,
  ]
})
export class QuotesModule {}
