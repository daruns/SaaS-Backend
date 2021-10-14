import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientContactsModule } from './clientContacts/clientContacts.module';
import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ClientsModule, AuthModule, ClientContactsModule],
  providers: [],
})
export class ApiModule {}
