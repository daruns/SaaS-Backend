import { IsNotEmpty, IsInt, IsDate } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  date: Date
  @IsNotEmpty()
  expiryDate: Date
  billingAddress: string
  @IsNotEmpty()
  discount: number
  @IsNotEmpty()
  taxRatio: number
  @IsNotEmpty()
  exchangeRate: number
  @IsNotEmpty()
  currencyCode: string
  clientContactId: number
  @IsNotEmpty()
  clientId: number
  @IsNotEmpty()
  status: string
}

export class CreateInvoiceItemDto {
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  category: string
  @IsNotEmpty()
  itemId: number
  @IsNotEmpty()
  unitPrice: number
  @IsNotEmpty()
  @IsInt()
  qty: number
  @IsDate()
  purchasedAt: Date
  @IsDate()
  expiryDate: Date
  supplier: string
}