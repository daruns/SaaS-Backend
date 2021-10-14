import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateClientDto {
  @IsNotEmpty({ message: 'ClientId is required' })
  @IsInt({ message: 'Client id must be integer' })
  id: number;

  name: string
  logo: string
  @IsString()
  @IsNotEmpty()
  @Matches(PhoneNumberRegex.reg)
  phoneNumber1: string
  phoneNumber2: string
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
