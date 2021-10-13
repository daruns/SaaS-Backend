import { IsNotEmpty, MinLength, MaxLength, IsInt } from 'class-validator';

export class UpdateClientDto {
  @IsNotEmpty({ message: 'ClientId is required' })
  @IsInt({ message: 'Client id must be integer' })
  clientId: number;

  // @IsNotEmpty({ message: 'Title is required' })
  // @MinLength(5, { message: 'Title must have 6 chars' })
  // @MaxLength(40, { message: 'Title is too long. only 40 chars allow.' })
  name: string
  logo: string
  phoneNumbers: string
  phoneNumber1: string
  phoneNumber2: string
  clientType: string
  businessType: string
  email: string
  website: string
  address: string
  rate: number
  zipCode: string
  status: string
  deleted:number
  createdBy:string
  updatedBy:string
  userId: number
}
