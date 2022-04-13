import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class CreateLeaveTypeDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  fund: number
  days: number
  urgent: boolean
}
