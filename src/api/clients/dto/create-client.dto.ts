import { IsEmail, IsNotEmpty, IsString, IsInt, Max, Min, IsOptional, IsIn } from 'class-validator';
import { DefaultTo, FileParamDto, ToPhone, ToRate } from 'src/app/app.service';

export class CreateClientDto {
  @IsNotEmpty()
  name: string
  logo: FileParamDto

  @ToPhone
  @IsOptional()
  phoneNumbers: string

  @IsString()
  @DefaultTo('lead')
  clientType: string

  @IsString()
  @IsOptional()
  businessType: string

  @IsString()
  @IsEmail({})
  email: string;

  @IsString()
  @IsOptional()
  website: string

  @IsString()
  @IsOptional()
  address: string

  @ToRate
  @Min(0)
  @Max(10)
  @IsOptional()
  rate: number

  @IsString()
  @IsOptional()
  zipCode: string
}
