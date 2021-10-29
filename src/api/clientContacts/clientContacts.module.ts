import { Module } from '@nestjs/common';
import { UsersService } from '../auth/apps/users/users.service';
import { ClientsModule } from '../clients/clients.module';
import { ClientsService } from '../clients/clients.service';
import { ClientContactsController } from './clientContacts.controller';
import { ClientContactsService } from './clientContacts.service';

@Module({
  imports: [ClientsModule],
  controllers: [ClientContactsController],
  providers: [ClientContactsService,UsersService,ClientsService],
})
export class ClientContactsModule {}
