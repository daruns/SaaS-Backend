import { IsNotEmpty, IsInt, IsOptional, IsNotIn, IsIn } from 'class-validator';

export class CreateOvertimeTypeDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  fund: number
  days: number
  hours: number
  @IsNotEmpty()
  @IsIn(['days','hours'])
  durationType: string = 'hours'
}
