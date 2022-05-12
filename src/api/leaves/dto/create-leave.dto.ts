import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';
import { DefaultToNow } from 'src/app/app.service';

export class CreateLeaveDto {
  name: string
  description: string
  @DefaultToNow
  @IsNotEmpty()
  from: Date
  @IsNotEmpty()
  leaveTypeId: number
  readonly currentBalance: number
  readonly remainBalance: number
  @DefaultToNow
  @IsNotEmpty()
  to: Date
  @IsNotEmpty({ message: 'Employee Id is required' })
  employeeId: number
}
