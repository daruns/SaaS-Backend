import { IsEmail, IsNotEmpty, IsString, IsInt, Max, Min, IsOptional, IsIn, MinLength, MaxLength } from 'class-validator';
import { UserLayers } from 'src/api/auth/dto/user-layers.dto';
import { DefaultTo, FileParamDto, ToPhone, ToRate } from 'src/app/app.service';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string
  leaveBalance: number
  overtimeBalance: number
  salary: number
  @IsNotEmpty()
  designationId: number
  @IsOptional()
  managerId: number
  hrMember: boolean
  isManager: boolean

  //user params
  @MinLength(3, { message: 'username must more than 3 chars' })
  @MaxLength(30, { message: 'username is too long. only 30 chars allowed.' })
  @IsOptional()
  username: string
  @IsString()
  @IsEmail({})
  @IsOptional()
  email: string;
  @MinLength(8, { message: 'Password must have 8 chars' })
  @MaxLength(30, { message: 'Password is too long. only 30 chars allow.' })
  @IsOptional()
  password: string;
  readonly userType:string = UserLayers.layerThree
  @ToPhone
  @IsString({message: "must be a valid phonenumber"})
  @IsOptional()
  phoneNumber: string
  createdBy: string
  brandCode: string
  status: string
}
