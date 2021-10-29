import { Type } from 'class-transformer';
import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsDate } from 'class-validator';

export class UpdateMeetingDto {
  @IsInt()
  id: number
  @Type(() => Date)
  @IsDate()
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
  @IsOptional()
  @Type(() => Date)
  @IsDate()
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
  @IsInt({ message: 'clientId must be integer' })
  @IsOptional()
  clientId: number
}
