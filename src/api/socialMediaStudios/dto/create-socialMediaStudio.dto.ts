import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional, IsIn } from 'class-validator';
import { DefaultToFalse, DefaultToNow, linkAddressRegex, PhoneNumberRegex, ToLower } from 'src/app/app.service';
import { SocialMediaStudioUserDto } from './socialMediaStudioUser.dto';

export class CreateSocialMediaStudioDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  @DefaultToNow
  plannedStartDate: Date
  @DefaultToNow
  plannedEndDate: Date
  @DefaultToNow
  schedule: Date
  @DefaultToFalse
  mineApproved: boolean
  @DefaultToFalse
  clientApproval: boolean
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
