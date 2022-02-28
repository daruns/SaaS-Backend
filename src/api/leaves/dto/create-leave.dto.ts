import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class CreateLeaveDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  description: string
  @IsNotEmpty()
  from: Date
  @IsNotEmpty()
  to: Date
  @IsNotEmpty()
  currentBalance: number
  @IsNotEmpty()
  remainBalance: number
  @IsNotEmpty()
  employeeId: number
}
