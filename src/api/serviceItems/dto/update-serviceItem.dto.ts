import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateServiceItemDto {
  @IsInt()
  id: number
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
