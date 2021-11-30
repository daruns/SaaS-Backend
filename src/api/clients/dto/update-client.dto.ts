import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsOptional, Min, Max } from 'class-validator';
import { FileParamDto, PhoneNumberRegex, ToRate } from 'src/app/app.service'
import { CreateClientUserDto } from './create-client-user.dto';

export class UpdateClientDto {
  @IsNotEmpty({ message: 'ClientId is required' })
  id: number|string
  @IsOptional()
  @IsString()
  name: string
  logo: FileParamDto
  @IsString()
  @IsOptional()
  @Matches(PhoneNumberRegex.reg)
  phoneNumbers: string
  @IsOptional()
  @IsString()
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
