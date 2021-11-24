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

export class PassCreateExpenseItemDto {
  expenseId: number
  name: string
  description: string
  brandCode: string
  unitPrice: number
  qty: number
  createdBy: string
}
