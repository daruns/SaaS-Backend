import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty({ message: 'Name is required' })
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
