import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class QueryAuthUser {
	@IsNotEmpty()
	id: number
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email address is invalid' })
  email: string;
  
  @IsNotEmpty({ message: 'Username is required' })
  username: string
  @IsString()
  @IsNotEmpty()
  @Matches(PhoneNumberRegex.reg)
  phoneNumber: string
  @IsNotEmpty()
  website: string
  @IsNotEmpty()
  subdomain: string
  avatar: string
  @IsNotEmpty()
  userType: string
  department: string
  reportsTo: string
}
