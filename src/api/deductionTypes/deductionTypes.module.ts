import { Module } from '@nestjs/common';
import { DeductionTypesController } from './deductionTypes.controller';
import { DeductionTypesService } from './deductionTypes.service';

@Module({
  controllers: [DeductionTypesController],
  providers: [DeductionTypesService],
  exports: [DeductionTypesService],
})
export class DeductionTypesModule {}
