import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn } from 'class-validator';

export class UpdatePaymentMethodDto {
  @IsInt()
  id: number
  name: string
  type: string
  description: string
  expireDate: Date
  pin: string
  cvs: string
  status: string
}
