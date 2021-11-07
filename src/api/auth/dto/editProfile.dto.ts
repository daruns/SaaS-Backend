import { IsNotEmpty, Length, IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class EditProfileDto{
	@IsOptional()
	@Length(7,30)
	password: string
	@IsOptional()
	@IsString()
	@Matches(PhoneNumberRegex.reg)
	phoneNumber: string
	userType: string
	avatar: string
	name: string
}
