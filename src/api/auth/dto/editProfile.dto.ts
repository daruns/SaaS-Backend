import { IsNotEmpty, Length, IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { FileParamDto, PhoneNumberRegex, ToPhone, SkipEmpty } from 'src/app/app.service'

export class EditProfileDto{
	@IsOptional()
	@SkipEmpty
	@IsOptional({message: "password must be longer than 8 characters"})
	password: string
	@IsOptional()
	@ToPhone
	@IsOptional({ message: 'phoneNumber must be a valid number' })
	phoneNumber: string
	avatar: string|FileParamDto
	name: string
}
