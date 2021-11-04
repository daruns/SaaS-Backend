import {IsInt, IsDate, IsNotIn } from 'class-validator';
import { isDate } from 'moment';
import { CreateInvoiceDto, CreateInvoiceItemDto } from './create-invoice.dto';

export class PassCreateInvoiceDto {
  invoiceNumber: string
  date: any
  dueDate: any
  brandCode: string
  createdBy: string
  taxRate: number
  exchangeRate: number
  totalAmount: number
  discount: number
}

export class PassCreateInvoiceItemDto extends CreateInvoiceItemDto {
  invoiceId: number
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