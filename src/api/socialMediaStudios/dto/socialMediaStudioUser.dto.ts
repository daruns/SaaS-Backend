import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional, IsIn, IsBoolean } from 'class-validator';
import { FileParamDto, linkAddressRegex, PhoneNumberRegex,ToLower } from 'src/app/app.service';

export class SocialMediaStudioUserDto {
  @IsInt()
  id: number
  @IsBoolean()
  @IsOptional()
  canEdit: boolean
  @IsBoolean()
  @IsOptional()
  approved: boolean
}
