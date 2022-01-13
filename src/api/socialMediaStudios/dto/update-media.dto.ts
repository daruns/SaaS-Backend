import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn } from 'class-validator';
import { linkAddressRegex, PhoneNumberRegex, ToLower} from 'src/app/app.service'

export class UpdateMediaDto {
  @IsInt()
  id: number
  @IsOptional()
  name: string
  @IsString()
  @IsOptional()
  // @IsIn(['post','story','poster','feed','other'])
  type: string
  @ToLower
  @IsOptional()
  // @IsIn(['1:1','6:9','1:2'])
  designSize: string
  @IsOptional()
  plannedStartDate: Date
  @IsOptional()
  plannedEndDate: Date
  priority: string
  title: string
  caption: string
  textOnDesign: string
  attachments: [];
}
