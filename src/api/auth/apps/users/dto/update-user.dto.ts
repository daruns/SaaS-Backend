import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches, IsInt, IsOptional, IsIn } from 'class-validator';
import { UserLayers } from 'src/api/auth/dto/user-layers.dto';
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
  phoneNumber: string
  @IsOptional()
  @IsIn(Object.values(UserLayers))
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
