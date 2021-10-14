import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email address is invalid' })
  email: string;
  
  @IsNotEmpty({ message: 'Username is required' })
  username: string

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(7, { message: 'Password must have 8 chars' })
  @MaxLength(30, { message: 'Password is too long. only 30 chars allow.' })
  password: string;
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
