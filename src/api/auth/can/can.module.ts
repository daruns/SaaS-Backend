import { Module } from '@nestjs/common';
import { CanService } from 'src/api/auth/can/can.service';
import { CanController } from './can.controller';

@Module({
  controllers: [CanController],
  providers: [CanService],
  exports: [CanService],
})
export class CanModule {}
