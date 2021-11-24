import { IsNotEmpty, IsInt, IsDate, IsNotIn, IsIn } from 'class-validator';
import { isDate } from 'moment';

export class CreateExpenseDto {
  @IsNotEmpty()
  date: Date
  @IsNotEmpty()
  dueDate: Date
  billingAddress: string
  description: string
  @IsNotEmpty()
  // @IsNotIn([0])
  discount: number
  @IsNotEmpty()
  currencyCode: string
  @IsNotEmpty()
  paymentMethodId: number
  @IsNotEmpty()
  taxId: number
  @IsNotEmpty()
  supplierId: number
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