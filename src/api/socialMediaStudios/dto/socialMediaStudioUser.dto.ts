import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional, IsIn, IsBoolean } from 'class-validator';
import { DefaultToFalse, FileParamDto, linkAddressRegex, PhoneNumberRegex,ToInteger,ToLower } from 'src/app/app.service';

export class SocialMediaStudioUserDto {
  @IsOptional()
  @ToInteger
  id: number
  @ToInteger
  userId: number
  @IsOptional()
  @ToInteger
  socialMediaStudioId: number
  @DefaultToFalse
  @IsBoolean()
  canEdit: boolean
  @DefaultToFalse
  @IsBoolean()
  approved: boolean
}
