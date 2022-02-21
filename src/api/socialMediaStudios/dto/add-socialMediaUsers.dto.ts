import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional, IsIn } from 'class-validator';
import { FileParamDto, linkAddressRegex, PhoneNumberRegex,ToInteger,ToLower } from 'src/app/app.service';
import { SocialMediaStudioUserDto } from './socialMediaStudioUser.dto';

export class AddSocialMediaUsersDto {
	@ToInteger
	@IsInt()
	@IsNotEmpty()
	id: number
	@IsNotEmpty()
	users: SocialMediaStudioUserDto[]
}