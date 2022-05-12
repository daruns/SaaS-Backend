import { IsNotEmpty, IsInt, IsOptional, IsNotIn, IsIn } from 'class-validator';

export class CreatePayslipDto {
  @IsNotEmpty({ message: 'fromDate is required' })
  fromDate: Date
  toDate: Date
  @IsNotEmpty({ message: 'Employee Id is required' })
  employeeId: number
}
