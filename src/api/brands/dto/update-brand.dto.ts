import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';
import { FileParamDto, PhoneNumberRegex, ToPhone } from 'src/app/app.service'

export class UpdateBrandDto {

  @IsNotEmpty({ message: 'Id is required' })
  id: number
  name: string;
  logo: string|FileParamDto
  companySize: number
  address: string
  announcedAt: Date
  branches: string
  occupation: string
  website: string
  @ToPhone
  @IsOptional()
  phoneNumber: string
  @IsEmail({}, { message: 'Email address is invalid' })
  @IsOptional({ message: 'Email is required' })
  email: string
}
