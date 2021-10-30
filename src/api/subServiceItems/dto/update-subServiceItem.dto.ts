import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateSubServiceItemDto {
  @IsInt()
  id: number
  @IsOptional()
  name: string
  @IsOptional()
  @IsInt()
  serviceItemId: number
}
