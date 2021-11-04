import {IsInt, IsDate, IsNotIn } from 'class-validator';
import { isDate } from 'moment';
import { CreateQouteDto, CreateQouteItemDto } from './create-qoute.dto';

export class PassCreateQouteDto {
  qouteNumber: string
  date: any
  dueDate: any
  brandCode: string
  createdBy: string
  taxRate: number
  exchangeRate: number
  totalAmount: number
  discount: number
}

export class PassCreateQouteItemDto extends CreateQouteItemDto {
  qouteId: number
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