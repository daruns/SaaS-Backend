import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class CreateLeaveDto {
  name: string
  description: string
  @IsNotEmpty()
  from: Date
  @IsNotEmpty()
  leaveTypeId: number
  readonly currentBalance: number
  readonly remainBalance: number
  @IsNotEmpty()
  to: Date
  employeeId: number
}
