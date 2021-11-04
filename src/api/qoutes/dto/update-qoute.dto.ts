import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsDecimal, IsNotIn } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateQouteDto {
  @IsNotEmpty()
  @IsInt()
  id: number
  billingAddress: string
  description: string
  paymentMethod: string
  @IsOptional()
  @IsNotIn([0])
  discount: number
  @IsOptional()
  @IsNotIn([0])
  taxRate: number
  @IsOptional()
  @IsNotIn([0])
  exchangeRate: number
  @IsOptional()
  @IsNotEmpty()
  currencyCode: string
  @IsOptional()
  @IsNotEmpty()
  status: string
}
