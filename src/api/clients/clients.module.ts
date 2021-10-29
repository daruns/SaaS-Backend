import { Module } from '@nestjs/common';
import { UsersModule } from 'src/api/auth/apps/users/users.module';
import { UsersService } from 'src/api/auth/apps/users/users.service';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [UsersModule],
  controllers: [ClientsController],
  providers: [ClientsService,UsersService],
  exports: [ClientsService],
})
export class ClientsModule {}
