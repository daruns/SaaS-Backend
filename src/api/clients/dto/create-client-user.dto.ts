import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsOptional, IsString, IsInt } from 'class-validator';
import { ToPhone } from 'src/app/app.service';

export class CreateClientUserDto {
  @IsNotEmpty()
  id: number
  name: string
  @MinLength(3, { message: 'username must more than 3 chars' })
  @MaxLength(30, { message: 'username is too long. only 30 chars allowed.' })
  username: string
  email: string;
  @MinLength(8, { message: 'Password must have 8 chars' })
  @MaxLength(30, { message: 'Password is too long. only 30 chars allow.' })
  password: string;
  readonly userType:string = "partner"
  @IsOptional()
  @ToPhone
  @IsString({message: "must be a valid phonenumber"})
  phoneNumber: string
  createdBy: string
  avatar: string
  reportsTo: string
  brandCode: string
  status: string
}
