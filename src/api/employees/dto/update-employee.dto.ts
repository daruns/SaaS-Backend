import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsOptional, Min, Max, IsEmail } from 'class-validator';
import { UserLayers } from 'src/api/auth/dto/user-layers.dto';
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
  overtimeBalance: number
  salary: number
  hrMember: boolean
  isManager: boolean

  readonly userType:string = UserLayers.layerThree
  @ToPhone
  @IsString({message: "must be a valid phonenumber"})
  @IsOptional()
  phoneNumber: string
  createdBy: string
  brandCode: string
  status: string
}
