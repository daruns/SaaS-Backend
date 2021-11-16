import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateSubServiceItemDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  description: string
  @IsNotEmpty()
  @IsInt()
  serviceItemId: number
  @IsOptional()
  @IsInt()
  unitPrice: number
  purchasedAt: Date
  expireDate: Date
  supplier: string
}
