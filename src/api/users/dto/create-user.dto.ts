import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

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

  phoneNumber: string
  website: string
  avatar: string
  userType: string
  department: string
  reportsTo: string

}
