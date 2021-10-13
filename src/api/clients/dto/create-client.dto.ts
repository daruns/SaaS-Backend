import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty({ message: 'Name is required' })
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
  userId: number
  status
  deleted:number
  createdBy:string

  // @IsNotEmpty({ message: 'Email is required' })
  // @IsEmail({}, { message: 'Email address is invalid' })
  // email: string;

  // @IsNotEmpty({ message: 'Password is required' })
  // @MinLength(5, { message: 'Password must have 6 chars' })
  // @MaxLength(30, { message: 'Password is too long. only 30 chars allow.' })
  // password: string;
}
