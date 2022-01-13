import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional, IsIn } from 'class-validator';
import { linkAddressRegex, PhoneNumberRegex, ToLower } from 'src/app/app.service';
import { SocialMediaStudioUserDto } from './socialMediaStudioUser.dto';

export class CreateSocialMediaStudioDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  plannedStartDate: Date
  plannedEndDate: Date
  schedule: Date
  @ToLower
  @IsIn(['draft','production', 'review'])
  stage: string
  priority: string
  description: string
  @IsInt({ message: 'ClientId must be integer' })
  @IsOptional()
  clientId: number
  users: SocialMediaStudioUserDto[]
}
