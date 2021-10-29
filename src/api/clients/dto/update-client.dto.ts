import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsOptional } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateClientDto {
  @IsNotEmpty({ message: 'ClientId is required' })
  @IsInt({ message: 'Client id must be integer' })
  id: number;

  name: string
  logo: string
  @IsString()
  @IsOptional()
  @Matches(PhoneNumberRegex.reg)
  phoneNumbers: string
  clientType: string
  businessType: string
  email: string
  website: string
  address: string
  rate: number
  zipCode: string
  status: string
  deleted:number
  updatedBy:string
  userId: number
}
