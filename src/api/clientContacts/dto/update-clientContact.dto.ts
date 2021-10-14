import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateClientContactDto {
  @IsInt()
  id: number
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  @IsOptional()
  name: string  
  @IsString()
  @IsNotEmpty()
  @Matches(PhoneNumberRegex.reg)
  @IsOptional()
  businessPhoneNumber1: string
  @IsString()
  @Matches(PhoneNumberRegex.reg)
  @IsOptional()
  businessPhoneNumber2: string
  @IsEmail({}, { message: 'Email address is invalid' })
  @IsOptional()
  email: string
  @IsString()
  @IsOptional()
  position: string
  @IsString()
  @IsOptional()
  description: string
  @IsString()
  @IsOptional()
  department: string
  @IsString()
  @IsOptional()
  status: string
  @IsInt({ message: 'deleted must be integer' })
  @IsOptional()
  deleted: number
  @IsString()
  @IsOptional()
  updatedBy:string
  @IsInt({ message: 'clientId must be integer' })
  @IsOptional()
  clientId: number
}
