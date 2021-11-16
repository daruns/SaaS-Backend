import {IsInt, IsDate, IsNotIn, IsIn } from 'class-validator';
import { isDate } from 'moment';
import { CreateExpenseDto, CreateExpenseItemDto } from './create-expense.dto';

export class PassCreateExpenseDto {
  expenseNumber: string
  date: any
  dueDate: any
  brandCode: string
  subTotalAmount: number
  createdBy: string
  taxRate: number
  exchangeRate: number
  totalAmount: number
  discount: number
  taxId: number
  paymentMethodId: number
  supplierId: number
}

export class PassCreateExpenseItemDto extends CreateExpenseItemDto {
  expenseId: number
  name: string
  category: boolean
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
