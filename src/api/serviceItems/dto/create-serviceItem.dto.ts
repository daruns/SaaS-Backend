import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class CreateServiceItemDto {
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
