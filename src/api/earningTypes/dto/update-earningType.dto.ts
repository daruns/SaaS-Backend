import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn } from 'class-validator';

export class UpdateEarningTypeDto {
  @IsInt()
  id: number
  name: string
  type: string
  fund: number
  rate: number
  @IsOptional()
  @IsIn(['days','weeks','months'])
  durationType: string
  brandCode: string
}
