import { IsNotEmpty, IsInt, IsDate, IsNotIn, IsIn } from 'class-validator';
import { isDate } from 'moment';
import { DefaultToNow } from 'src/app/app.service';
import { CURRENCY_CODES } from 'src/lib/defaults';

export class CreateExpenseDto {
  @DefaultToNow
  @IsNotEmpty()
  date: Date
  @DefaultToNow
  @IsNotEmpty()
  dueDate: Date
  billingAddress: string
  description: string
  category: string
  @IsNotEmpty()
  // @IsNotIn([0])
  discount: number
  @IsNotEmpty()
  @IsIn(CURRENCY_CODES)
  currencyCode: string
  exchangeRate: number
  paymentMethodId: number
  taxId: number
  supplierId: number
  bankFee: number
}

export class CreateExpenseItemDto {
  expenseId: number
  @IsNotEmpty()
  name: string
  description: string
  brandCode: string
  // @IsNotEmpty()
  itemId: number
  // @IsNotEmpty()
  category: boolean
  @IsNotEmpty()
  @IsInt()
  unitPrice: number
  @IsNotEmpty()
  @IsInt()
  qty: number
}