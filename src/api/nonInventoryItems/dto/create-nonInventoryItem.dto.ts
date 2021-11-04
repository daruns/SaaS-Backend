import { IsNotEmpty, IsInt, IsOptional, IsNotIn, IsDate } from 'class-validator';
import { isDate } from 'moment';

export class CreateNonInventoryItemDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  description: string
  @IsOptional()
  @IsInt()
  unitPrice: number
  purchasedAt: Date
  expireDate: Date
  supplier: string
}
