import { Module } from '@nestjs/common';
import { EarningTypesModule } from '../earningTypes/earningTypes.module';
import { EmployeesModule } from '../employees/employees.module';
import { EarningsController } from './earnings.controller';
import { EarningsService } from './earnings.service';

@Module({
  imports: [EmployeesModule, EarningTypesModule],
  controllers: [EarningsController],
  providers: [EarningsService],
})
export class EarningsModule {}
