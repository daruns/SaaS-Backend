import { IsEmail, IsNotEmpty, IsString, IsInt, Max, Min, IsOptional } from 'class-validator';
import { FileParamDto, ToPhone, ToRate } from 'src/app/app.service';

export class CreateClientDto {
  @IsNotEmpty()
  name: string
  logo: FileParamDto
  @IsNotEmpty()
  @ToPhone
  @IsString()
  phoneNumbers: string

  @IsOptional()
  @IsString()
  clientType: string

  @IsOptional()
  @IsString()
  businessType: string

  @IsOptional()
  @IsString()
  @IsEmail({})
  email: string;

  @IsOptional()
  @IsString()
  website: string

  @IsOptional()
  @IsString()
  address: string
  @ToRate
  @Min(0)
  @Max(10)
  rate: number

  @IsOptional()
  @IsString()
  zipCode: string

  @IsOptional()
  @IsString()
  status: string
}
