import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn } from 'class-validator';

export class UpdateTaxDto {
  @IsInt()
  id: number
  name: string
  type: string
  @IsNotIn([0])
  @IsInt()
  @IsOptional()
  rate: number
  status: string
  description: string
}
