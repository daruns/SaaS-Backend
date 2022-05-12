import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional, IsDate } from 'class-validator';

export class CreateEarningDto {
  description: string
  qty: number
  total: number
  date: Date
  @IsNotEmpty({ message: 'employeeId is required' })
  @IsInt({ message: 'employeeId must be integer' })
  employeeId: number
  @IsNotEmpty({ message: 'earningTypeId is required' })
  @IsInt({ message: 'earningTypeId must be integer' })
  earningTypeId: number
}
