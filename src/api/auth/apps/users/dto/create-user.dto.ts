import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches, IsIn } from 'class-validator';
import { UserLayers } from 'src/api/auth/dto/user-layers.dto';
import { FileParamDto, PhoneNumberRegex, ToPhone } from 'src/app/app.service'

export class CreateUserDto {
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
  @IsIn(Object.values(UserLayers))
  userType: string
  avatar: string|FileParamDto
  department: string
  reportsTo: string
  // activationToken: string
  // activationTokenExpire: Date
  // activatedAt: Date
  // passwordResetToken: string
  // passwordResetTokenExpire: Date
  // lastResetAt: Date
  brandCode: string
  permissions: Array<{subjects: string[],all: boolean, read: boolean, create: boolean, update: boolean, delete: boolean }>
}

export type PermissionType = Array<{subjects: string[],all: boolean, read: boolean, create: boolean, update: boolean, delete: boolean }>