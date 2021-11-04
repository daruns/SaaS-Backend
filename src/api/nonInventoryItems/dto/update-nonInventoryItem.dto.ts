import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn, IsDate } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateNonInventoryItemDto {
  @IsInt()
  id: number
  name: string
  description: string
  @IsOptional()
  @IsInt()
  unitPrice: number
  @IsOptional()
  purchasedAt: Date
  @IsOptional()
  expireDate: Date
  supplier: string
}
