import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';

@Module({
  imports: [ClientsModule],
  controllers: [MeetingsController],
  providers: [MeetingsService],
})
export class MeetingsModule {}
