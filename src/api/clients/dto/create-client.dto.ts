import { IsEmail, IsNotEmpty, IsString, IsInt, Max, Min } from 'class-validator';
import { ToPhone } from 'src/app/app.service';

export class CreateClientDto {
  @IsNotEmpty()
  name: string
  logo: string
  @IsNotEmpty()
  @ToPhone
  @IsString()
  phoneNumbers: string
  clientType: string
  businessType: string
  @IsEmail({})
  email: string;
  website: string
  address: string
  @IsInt()
  @Min(0)
  @Max(10)
  rate: number
  zipCode: string
  status: string
}
