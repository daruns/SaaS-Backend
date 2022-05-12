import { Type } from 'class-transformer';
import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsDate } from 'class-validator';

export class UpdateDeductionDto {
  @IsInt()
  id: number
  description: string
  qty: number
  total: number
  date: Date
  employeeId: number
  deductionTypeId: number
}
