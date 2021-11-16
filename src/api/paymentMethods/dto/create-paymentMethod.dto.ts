import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  type: string
  description: string
  expireDate: Date
  pin: string
  cvs: string
}
