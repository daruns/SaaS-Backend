import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ClientContactsController } from './clientContacts.controller';
import { ClientContactsService } from './clientContacts.service';

@Module({
  controllers: [ClientContactsController],
  providers: [ClientContactsService,UsersService],
})
export class ClientContactsModule {}
