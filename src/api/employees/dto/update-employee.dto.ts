import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsOptional, Min, Max, IsEmail } from 'class-validator';
import { DefaultTo, FileParamDto, PhoneNumberRegex, ToPhone, ToRate } from 'src/app/app.service'

export class UpdateEmployeeDto {
  @IsNotEmpty({ message: 'EmployeeId is required' })
  id: number
  @IsOptional()
  @IsString()
  name: string
  @IsOptional()
  designationId: number
  @IsOptional()
  managerId: number
  @IsOptional()
  userId: number
  leaveBalance: number
  salary: number
  hrMember: boolean

  //user params
  @MinLength(3, { message: 'username must more than 3 chars' })
  @MaxLength(30, { message: 'username is too long. only 30 chars allowed.' })
  @IsOptional()
  username: string
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
  @MinLength(8, { message: 'Password must have 8 chars' })
  @MaxLength(30, { message: 'Password is too long. only 30 chars allow.' })
  @IsOptional()
  password: string;
  readonly userType:string = "agent"
  @ToPhone
  @IsString({message: "must be a valid phonenumber"})
  @IsOptional()
  phoneNumber: string
  createdBy: string
  brandCode: string
  status: string
}
