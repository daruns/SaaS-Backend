import { Module } from '@nestjs/common';
import { LeaveTypesController } from './leaveTypes.controller';
import { LeaveTypesService } from './leaveTypes.service';

@Module({
  controllers: [LeaveTypesController],
  providers: [LeaveTypesService],
  exports: [LeaveTypesService],
})
export class LeaveTypesModule {}
