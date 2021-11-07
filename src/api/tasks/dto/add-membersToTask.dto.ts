import { IsNotEmpty, IsInt, IsDate, IsNotIn } from 'class-validator';
import { isDate } from 'moment';

export class AddMembersToTaskDto {  
  @IsNotEmpty()
  id: number
  @IsNotEmpty()
  members: number[]
}
