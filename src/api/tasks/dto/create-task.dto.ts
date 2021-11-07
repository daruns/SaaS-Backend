import { IsNotEmpty, IsInt, IsDate, IsNotIn } from 'class-validator';
import { isDate } from 'moment';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string
  description: string
  @IsNotEmpty()
  priority: string
  @IsNotEmpty()
  plannedStartDate: Date
  @IsNotEmpty()
  plannedEndDate: Date
  @IsNotEmpty()
  boardId: number
  @IsNotEmpty()
  members: number[]
}

