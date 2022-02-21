import { IsNotEmpty, IsInt, IsDate, IsNotIn, Max, IsIn } from 'class-validator';
import { DefaultToEmpty, DefaultToNow, DefaultTo } from "src/app/app.service";
import { CURRENCY_CODES } from 'src/lib/defaults';

export class CreateQuoteDto {
  @DefaultToNow
  @IsNotEmpty()
  date: Date
  @DefaultToNow
  @IsNotEmpty()
  dueDate: Date
  billingAddress: string
  description: string
  paymentMethodId: number
  taxId: number
  @IsNotEmpty()
  // @IsNotIn([0])
  discount: number
  @IsNotEmpty()
  // @IsNotIn([0])
  taxRate: number
  bankFee: number
  @IsNotEmpty()
  // @IsNotIn([0])
  exchangeRate: number
  @IsNotEmpty()
  @IsIn(CURRENCY_CODES)
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
  itemId: number
  @DefaultTo(0)
  @IsNotEmpty()
  unitPrice: number
  @IsNotEmpty()
  @IsInt()
  // @IsNotIn([0])
  qty: number
  @DefaultToEmpty
  purchasedAt: Date
  @DefaultToEmpty
  expireDate: Date
  supplier: string
}