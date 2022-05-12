import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional, IsDate } from 'class-validator';

export class CreateDeductionDto {
  description: string
  qty: number
  total: number
  date: Date
  @IsNotEmpty({ message: 'employeeId is required' })
  @IsInt({ message: 'employeeId must be integer' })
  employeeId: number
  @IsNotEmpty({ message: 'deductionTypeId is required' })
  @IsInt({ message: 'deductionTypeId must be integer' })
  deductionTypeId: number
}
