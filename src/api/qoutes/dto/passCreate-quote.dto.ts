import {IsInt, IsDate, IsNotIn } from 'class-validator';
import { isDate } from 'moment';
import { CreateQuoteDto, CreateQuoteItemDto } from './create-quote.dto';

export class PassCreateQuoteDto {
  quoteNumber: string
  date: any
  dueDate: any
  clientId: number
  clientContactId: number
  brandCode: string
  paymentMethodId: number
  taxId: number
  subTotalAmount: number
  createdBy: string
  taxRate: number
  exchangeRate: number
  totalAmount: number
  bankFee: number
  discount: number
  currencyCode: string
}

export class PassCreateQuoteItemDto extends CreateQuoteItemDto {
  quoteId: number
  name: string
  category: string
  description: string
  billingAddress: string
  brandCode: string
  itemId: number
  unitPrice: number
  qty: number
  purchasedAt: Date
  expireDate: Date
  supplier: string
}