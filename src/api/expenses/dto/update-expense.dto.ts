import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsDecimal, IsNotIn } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'
import { CreateExpenseItemDto } from './create-expense.dto';

export class UpdateExpenseDto {
  @IsNotEmpty()
  @IsInt()
  id: number
  billingAddress: string
  description: string
  category: string
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
  status: string
}
