import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateServiceItemDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  description: string
  @IsOptional()
  @IsInt()
  unitPrice: number
  @IsOptional()
  @IsInt()
  qty: number
  purchasedAt: Date
  expireDate: Date
  supplier: string
}
