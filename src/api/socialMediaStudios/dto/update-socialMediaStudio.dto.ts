import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn } from 'class-validator';
import { linkAddressRegex, PhoneNumberRegex, ToLower} from 'src/app/app.service'

export class UpdateSocialMediaStudioDto {
  @IsInt()
  id: number
  @IsOptional()
  name: string
  @IsString()
  @IsOptional()
  @IsIn(['rejected','done','pending'])
  status: string
  @ToLower
  @IsOptional()
  @IsIn(['production','review','complete'])
  stage: string
  @IsOptional()
  plannedStartDate: Date
  @IsOptional()
  plannedEndDate: Date
  schedule: Date
  priority: string
  description: string
  @IsInt({ message: 'clientId must be integer' })
  @IsOptional()
  clientId: number
  users: number[]
}
