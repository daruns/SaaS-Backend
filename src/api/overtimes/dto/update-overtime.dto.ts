import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn } from 'class-validator';

export class UpdateOvertimeDto {
  @IsInt()
  id: number
  name: string
  description: string
  from: Date
  to: Date
  currentBalance: number
  remainBalance: number
  employeeId: number
}

export class UpdateApprovalDto {
  @IsInt()
  id: number
  @IsIn(['completed', 'rejected'])
  status: string
}