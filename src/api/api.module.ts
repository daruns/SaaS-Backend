import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClientContactsModule } from './clientContacts/clientContacts.module';
import { ClientsModule } from './clients/clients.module';
import { MeetingsModule } from './meetings/meetings.module';
import { SocialMediasModule } from './socialMedias/socialMedias.module';
import { UsersModule } from 'src/api/auth/apps/users/users.module';
import { BrandsModule } from 'src/api/brands/brands.module';
import { InventoryItemsMdoule } from './inventoryItems/inventoryItems.module';
import { NonInventoryItemsMdoule } from './nonInventoryItems/nonInventoryItems.module';

@Module({
  imports: [
    UsersModule,
    ClientsModule,
    AuthModule,
    ClientContactsModule,
    MeetingsModule,
    SocialMediasModule,
    BrandsModule,
    InventoryItemsMdoule,
    NonInventoryItemsMdoule,
  ],
  providers: [],
})
export class ApiModule {}
