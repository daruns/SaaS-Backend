import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn } from 'class-validator';
import { linkAddressRegex, PhoneNumberRegex } from 'src/app/app.service'

export class UpdateSocialMediaDto {
  @IsInt()
  id: number
  @IsString()
  @IsOptional()
  name: string  
  @IsString()
  @Matches(linkAddressRegex.reg, { message: 'Link address is invalid' })
  @IsOptional()
  linkAddress: string
  addressDomain: string
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
