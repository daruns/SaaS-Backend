import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, Matches, IsInt, IsOptional, IsDate } from 'class-validator';

export class CreateMeetingDto {
  @IsNotEmpty({ message: 'Date is required' })
  @Type(() => Date)
  date: Date
  @IsInt()
  duration: number
  @IsString()
  type: string
  @IsString()
  details: string
  @IsString()
  serviceRequirements: string
  @IsOptional()
  @Type(() => Date)
  nextMeetingDate: Date
  @IsString()
  currentServiceProvider: string
  @IsOptional()
  @IsString()
  status: string
  @IsOptional()
  @IsInt()
  deleted: number
  createdBy: string
  @IsInt({ message: 'ClientId must be integer' })
  clientId: number
}
