import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service';

export class CreateClientContactDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  @Matches(PhoneNumberRegex.reg)
  @IsOptional()
  businessPhoneNumber1: string
  @Matches(PhoneNumberRegex.reg)
  @IsOptional()
  businessPhoneNumber2: string
  @IsEmail({}, { message: 'Email address is invalid' })
  email: string;
  position: string
  description: string
  department: string
  status: string
  @IsInt({ message: 'ClientId must be integer' })
  clientId: number
}
