import { Module } from '@nestjs/common';
import { UserModel } from 'src/database/models/user.model';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [UsersModule],
  controllers: [ClientsController],
  providers: [ClientsService,UsersService],
})
export class ClientsModule {}
