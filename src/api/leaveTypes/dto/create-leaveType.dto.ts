import { IsNotEmpty, IsInt, IsOptional, IsNotIn, IsIn } from 'class-validator';

export class CreateLeaveTypeDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  fund: number
  days: number
  hours: number
  urgent: boolean
  @IsIn(['days','hours'])
  durationType: string
}
