import { IsNotEmpty, Length, IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { FileParamDto, PhoneNumberRegex, ToPhone } from 'src/app/app.service'

export class EditProfileDto{
	@IsOptional()
	@Length(8,30)
	password: string
	@IsOptional()
	@ToPhone
	@IsString({ message: 'phoneNumber must be a valid number' })
	readonly phoneNumber!: string
	avatar: string|FileParamDto
	name: string
}
