import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsDecimal, IsNotIn, IsDate } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateInvoiceDto {
  @IsNotEmpty()
  @IsInt()
  id: number
  billingAddress: string
  description: string
  paymentMethod: string
  @IsOptional()
  discount: number
  @IsOptional()
  taxRate: number
  @IsOptional()
  exchangeRate: number
  @IsOptional()
  @IsNotEmpty()
  currencyCode: string
  @IsOptional()
  @IsNotEmpty()
  status: string
}
