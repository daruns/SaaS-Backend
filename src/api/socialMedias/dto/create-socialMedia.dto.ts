import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional } from 'class-validator';
import { linkAddressRegex, PhoneNumberRegex } from 'src/app/app.service';

export class CreateSocialMediaDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  @IsNotEmpty()
  @IsString()
  // @Matches(linkAddressRegex.reg, { message: 'Link address is invalid' })
  linkAddress: string
  addressDomain: string
  status: string
  @IsOptional()
  @IsInt()
  deleted: number
  createdBy: string
  @IsInt({ message: 'ClientId must be integer' })
  clientId: number
}
