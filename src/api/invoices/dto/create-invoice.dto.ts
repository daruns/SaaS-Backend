import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  date: Date
  @IsNotEmpty()
  dueDate: Date
  taxRatio: number
  discount: number
  billingAddress: number
  @IsNotEmpty()
  currencyCode: string
  @IsNotEmpty()
  exchangeRate: number
  @IsNotEmpty()
  clientContactId: number
  @IsNotEmpty()
  clientId: number
  @IsNotEmpty()
  status: string
}
