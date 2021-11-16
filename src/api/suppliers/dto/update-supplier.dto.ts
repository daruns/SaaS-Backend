import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn } from 'class-validator';

export class UpdateSupplierDto {
  @IsInt()
  id: number
  name: string
  logo: string
  phoneNumbers: string
  supplierType: string
  businessType: string
  email: string
  website: string
  address: string
  rate: number
  zipCode: string
  status: string
}
