import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsDecimal, IsNotIn } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateExpenseDto {
  @IsNotEmpty()
  @IsInt()
  id: number
  billingAddress: string
  description: string
  paymentMethodId: number
  supplierId: number
  taxId: number
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
