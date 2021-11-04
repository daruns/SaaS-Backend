import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class CreateInventoryItemDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  description: string
  @IsInt()
  unitPrice: number
  @IsInt()
  @IsNotIn([0])
  qty: number
  purchasedAt: Date
  expireDate: Date
  supplier: string
}
