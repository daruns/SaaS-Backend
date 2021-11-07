import { IsNotEmpty, IsInt, IsDate, IsNotIn } from 'class-validator';
import { isDate } from 'moment';

export class CreateQuoteDto {
  @IsNotEmpty()
  date: Date
  @IsNotEmpty()
  dueDate: Date
  billingAddress: string
  description: string
  paymentMethod: string
  @IsNotEmpty()
  @IsNotIn([0])
  discount: number
  @IsNotEmpty()
  @IsNotIn([0])
  taxRate: number
  @IsNotEmpty()
  @IsNotIn([0])
  exchangeRate: number
  @IsNotEmpty()
  currencyCode: string
  clientContactId: number
  @IsNotEmpty()
  clientId: number
  @IsNotEmpty()
  status: string
}

export class CreateQuoteItemDto {
  quoteId: number
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  category: string
  description: string
  brandCode: string
  @IsNotEmpty()
  itemId: number
  @IsNotEmpty()
  unitPrice: number
  @IsNotEmpty()
  @IsInt()
  @IsNotIn([0])
  qty: number
  @IsDate()
  purchasedAt: Date
  @IsDate()
  expireDate: Date
  supplier: string
}