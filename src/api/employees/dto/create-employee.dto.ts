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
  userId: number
  @ToPhone
  @IsString({message: "must be a valid phonenumber"})
  @IsOptional()
  phoneNumber: string
  createdBy: string
  brandCode: string
  status: string
}
