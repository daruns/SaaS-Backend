import { Module } from '@nestjs/common';
import { OvertimesController } from './overtimes.controller';
import { OvertimesService } from './overtimes.service';

@Module({
  controllers: [OvertimesController],
  providers: [OvertimesService],
  exports: [OvertimesService],
})
export class OvertimesModule {}
