import { Module } from '@nestjs/common';
import { OvertimeTypesController } from './overtimeTypes.controller';
import { OvertimeTypesService } from './overtimeTypes.service';

@Module({
  controllers: [OvertimeTypesController],
  providers: [OvertimeTypesService],
  exports: [OvertimeTypesService],
})
export class OvertimeTypesModule {}
