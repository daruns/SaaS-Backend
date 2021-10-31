import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsDecimal } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateQouteDto {
  @IsNotEmpty()
  @IsInt()
  id: number
  billingAddress: string
  @IsOptional()
  discount: number
  @IsOptional()
  taxRatio: number
  @IsOptional()
  exchangeRate: number
  @IsOptional()
  @IsNotEmpty()
  currencyCode: string
  @IsOptional()
  @IsNotEmpty()
  status: string
}
