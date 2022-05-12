import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn } from 'class-validator';

export class UpdateOvertimeTypeDto {
  @IsInt()
  id: number
  name: string
  fund: number
  days: number
  hours: number
  @IsOptional()
  @IsIn(['days','hours'])
  durationType: string = 'hours'
}
