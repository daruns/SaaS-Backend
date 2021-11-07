import { CreateQuoteItemDto } from './create-quote.dto';

export class PassCreateQuoteDto {
  quoteNumber: string
  date: any
  dueDate: any
  brandCode: string
  subTotalAmount: number
  createdBy: string
  taxRate: number
  exchangeRate: number
  totalAmount: number
  discount: number
}

export class PassCreateQuoteItemDto extends CreateQuoteItemDto {
  quoteId: number
  name: string
  category: string
  description: string
  billingAddress: string
  paymentMethod: string
  brandCode: string
  itemId: number
  unitPrice: number
  qty: number
  purchasedAt: Date
  expireDate: Date
  supplier: string
}