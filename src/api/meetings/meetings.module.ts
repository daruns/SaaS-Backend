import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';

@Module({
  controllers: [MeetingsController],
  providers: [MeetingsService,UsersService],
})
export class MeetingsModule {}
