import { Module } from '@nestjs/common';
import { EarningTypesController } from './earningTypes.controller';
import { EarningTypesService } from './earningTypes.service';

@Module({
  controllers: [EarningTypesController],
  providers: [EarningTypesService],
  exports: [EarningTypesService],
})
export class EarningTypesModule {}
