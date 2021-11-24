import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsDecimal, IsNotIn } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateProjectDto {
  @IsNotEmpty()
  id: number
  @IsOptional()
  name: string
  @IsOptional()
  plannedStartDate: Date
  @IsOptional()
  plannedEndDate: Date
  actualStartDate: Date
  actualdEndDate: Date
  rate: number
  rateType: string
  priority: string
  description: string
  // attachments: 
  status: string
  deleted: number
  clientId: number
  members: number[]
  leaders: number[]
}
