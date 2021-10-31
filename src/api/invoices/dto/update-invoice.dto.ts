import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateInvoiceDto {
  @IsNotEmpty()
  @IsInt()
  id: number
  date: Date
  expiryDate: Date
  exchangeRate: number
  taxRatio: number
  billingAddress: number
  totalAmount: number
  currencyCode: string
  discount: number
  status: string
}
