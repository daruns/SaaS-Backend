import { IsNotEmpty, Length, IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { PhoneNumberRegex, ToPhone } from 'src/app/app.service'

export class EditProfileDto{
	@IsOptional()
	@Length(8,30)
	password: string
	@ToPhone
	@IsString({ message: 'must be a valid number' })
	readonly phoneNumber!: string
	userType: string
	avatar: string
	name: string
}
