import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsOptional, Min, Max } from 'class-validator';
import { DefaultTo, FileParamDto, PhoneNumberRegex, ToPhone, ToRate } from 'src/app/app.service'
import { CreateClientUserDto } from './create-client-user.dto';

export class UpdateClientDto {
  @IsNotEmpty({ message: 'ClientId is required' })
  id: number|string
  @IsOptional()
  @IsString()
  name: string
  logo: FileParamDto
  @ToPhone
  @IsOptional()
  phoneNumbers: string
  @IsOptional()
  @IsString()
  @DefaultTo('lead')
  clientType: string
  @IsOptional()
  @IsString()
  businessType: string
  @IsOptional()
  @IsString()
  website: string
  @IsOptional()
  @IsString()
  address: string
  @IsOptional()
  @ToRate
  @Min(0)
  @Max(10)
  @IsInt()
  rate: number
  @IsOptional()
  @IsString()
  zipCode: string
  @IsOptional()
  @IsString()
  status: string
  user: CreateClientUserDto
}
