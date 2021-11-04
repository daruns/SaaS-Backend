import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateInventoryItemDto {
  @IsInt()
  id: number
  name: string
  description: string
  @IsOptional()
  @IsInt()
  unitPrice: number
  @IsOptional()
  @IsInt()
  @IsNotIn([0])
  qty: number
  purchasedAt: Date
  expireDate: Date
  supplier: string
}
