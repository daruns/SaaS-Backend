import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import { FileParamDto, PhoneNumberRegex, ToPhone } from 'src/app/app.service'

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email address is invalid' })
  email: string;
  @IsNotEmpty({ message: 'Username is required' })
  username: string
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must have 8 chars' })
  @MaxLength(30, { message: 'Password is too long. only 30 chars allow.' })
  password: string;
  @IsNotEmpty()
  @IsString()
  @ToPhone
  phoneNumber: string
  @IsNotEmpty()
  userType: string
  avatar: string|FileParamDto
  department: string
  reportsTo: string
  activationToken: string
  activationTokenExpire: Date
  activatedAt: Date
  passwordResetToken: string
  passwordResetTokenExpire: Date
  lastResetAt: Date
  brandCode: string
}
