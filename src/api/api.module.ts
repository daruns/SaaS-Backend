import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientContactsModule } from './clientContacts/clientContacts.module';
import { ClientsModule } from './clients/clients.module';
import { MeetingsModule } from './meetings/meetings.module';
import { SocialMediasModule } from './socialMedias/socialMedias.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ClientsModule, AuthModule, ClientContactsModule, MeetingsModule, SocialMediasModule],
  providers: [],
})
export class ApiModule {}
