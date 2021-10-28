import { Module } from '@nestjs/common';
import { ClientContactsController } from './clientContacts.controller';
import { ClientContactsService } from './clientContacts.service';

@Module({
  controllers: [ClientContactsController],
  providers: [ClientContactsService],
})
export class ClientContactsModule {}
