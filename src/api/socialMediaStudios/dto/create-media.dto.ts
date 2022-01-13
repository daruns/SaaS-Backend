import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional, IsIn } from 'class-validator';
import { FileParamDto, linkAddressRegex, PhoneNumberRegex,ToLower } from 'src/app/app.service';

export class CreateMediaDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  title: string
  caption: string
  textOnDesign: string
  plannedStartDate: Date
  plannedEndDate: Date
  priority: string
  @IsInt({ message: 'socialMediaStudioId must be integer' })
  @IsOptional()
  socialMediaStudioId: number
  @IsString()
  @IsOptional()
  @ToLower
  // @IsIn(['post','story','poster','feed','other'])
  type: string
  @ToLower
  @IsOptional()
  // @IsIn(['1:1','6:9','1:2'])
  designSize: string
  attachments: Array<FileParamDto>;
}
