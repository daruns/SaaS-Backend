import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn, Min, Max } from 'class-validator';

export class UpdateTaxDto {
  @IsInt()
  id: number
  name: string
  type: string
  @IsOptional()
  @Min(0.01)
  @Max(1)
  rate: number
  status: string
  description: string
}
