import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, Length, Max, Min } from 'class-validator';
import { max, min } from 'rxjs/operators';
import { PhoneNumberRegex } from 'src/app/app.service';

export class CreateClientDto {
  @IsNotEmpty()
  name: string
  logo: string
  // @Matches(PhoneNumberRegex.reg)
  @IsString()
  @IsNotEmpty()
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
  userId: number
  status: string
  deleted:number
  createdBy:string
}
