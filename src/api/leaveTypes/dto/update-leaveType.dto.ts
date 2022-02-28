import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn } from 'class-validator';

export class UpdateLeaveTypeDto {
  @IsInt()
  id: number
  name: string
  maxDays: number
  days: number
}
