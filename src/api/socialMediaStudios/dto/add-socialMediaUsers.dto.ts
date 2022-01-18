import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional, IsIn } from 'class-validator';
import { FileParamDto, linkAddressRegex, PhoneNumberRegex,ToLower } from 'src/app/app.service';
import { SocialMediaStudioUserDto } from './socialMediaStudioUser.dto';

export class AddSocialMediaUsersDto {
	@IsInt()
	@IsNotEmpty()
	id: number
	@IsNotEmpty()
	users: SocialMediaStudioUserDto[]
}