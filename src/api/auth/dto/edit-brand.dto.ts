import { IsNotEmpty, Length, IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { FileParamDto, PhoneNumberRegex, ToPhone, SkipEmpty } from 'src/app/app.service'

export class EditBrandDto{
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
    @IsOptional()
    email: string
}
