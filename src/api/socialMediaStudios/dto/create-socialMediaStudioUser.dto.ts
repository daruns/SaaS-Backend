import { IsInt, IsOptional, IsBoolean } from 'class-validator';
import { DefaultToFalse } from 'src/app/app.service';

export class CreateSocialMediaStudioUserDto {
  @IsInt()
  userId: number
  @IsInt()
  socialMediaStudioId: number
  @IsBoolean()
  canEdit: boolean
  @IsBoolean()
  approved: boolean
  createdBy: string
  brandCode: string
}
