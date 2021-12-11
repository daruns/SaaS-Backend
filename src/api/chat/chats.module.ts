import { Module } from '@nestjs/common';
import { FileUploadService } from 'src/app/app.service';
import { ClientsModule } from '../clients/clients.module';
import { ClientsService } from '../clients/clients.service';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [ClientsModule],
  controllers: [ChatsController],
  providers: [
    FileUploadService,
    ChatsService,
    ClientsService,
  ],
  exports: [ChatsService]
})
export class ChatsModule {}
