import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches, IsInt, IsOptional } from 'class-validator';
import { FileParamDto, PhoneNumberRegex, ToPhone } from 'src/app/app.service'

export class UpdateUserDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
  name: string;
  @IsOptional()
  @IsEmail({}, { message: 'Email address is invalid' })
  email: string;
  username: string
  @IsOptional()
  @MinLength(8, { message: 'Password must have 8 chars' })
  @MaxLength(30, { message: 'Password is too long. only 30 chars allow.' })
  password: string;
  @IsOptional()
  @ToPhone
  @IsString({message: "must be a valid phonenumber"})
  phoneNumber: string
  userType: string
  avatar: string|FileParamDto
  userId: number
  department: string
  reportsTo: string
  activationToken: string
  activationTokenExpire: Date
  activatedAt: Date
  passwordResetToken: string
  passwordResetTokenExpire: Date
  lastResetAt: Date
  brandCode: string
  status: string
  deleted: number
}
