import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class CreateBrandDto {

  brandCode: string
  @IsNotEmpty({ message: 'Subdomain is required' })
  subdomain: string
  name: string;
  logo: string
  companySize: number
  address: string
  announcedAt: Date
  branches: string
  occupation: string
  website: string
  @Matches(PhoneNumberRegex.reg)
  @IsOptional()
  phoneNumber: string
  @IsEmail({}, { message: 'Email address is invalid' })
  @IsOptional({ message: 'Email is required' })
  email: string
}
