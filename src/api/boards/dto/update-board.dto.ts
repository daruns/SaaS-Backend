import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateBoardDto {
  @IsInt()
  id: number
  name: string
  description: string
  @IsOptional()
  @IsInt()
  projectId: number
  status: string
  deleted: number
}
