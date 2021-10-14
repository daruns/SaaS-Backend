import { Type } from 'class-transformer';
import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsDate } from 'class-validator';

export class UpdateMeetingDto {
  @IsInt()
  id: number
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date: Date
  @IsInt()
  @IsOptional()
  duration: number
  @IsString()
  @IsOptional()
  type: string
  @IsString()
  @IsOptional()
  details: string
  @IsString()
  @IsOptional()
  serviceRequirements: string
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  nextMeetingDate: Date
  @IsString()
  @IsOptional()
  currentServiceProvider: string
  @IsString()
  @IsOptional()
  status: string
  @IsInt({ message: 'deleted must be integer' })
  @IsOptional()
  deleted: number
  @IsString()
  @IsOptional()
  updatedBy:string
  @IsInt({ message: 'clientId must be integer' })
  @IsOptional()
  clientId: number
}
