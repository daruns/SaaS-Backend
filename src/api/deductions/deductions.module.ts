import { Module } from '@nestjs/common';
import { EmployeesModule } from '../employees/employees.module';
import { DeductionsController } from './deductions.controller';
import { DeductionsService } from './deductions.service';

@Module({
  imports: [EmployeesModule],
  controllers: [DeductionsController],
  providers: [DeductionsService],
})
export class DeductionsModule {}
