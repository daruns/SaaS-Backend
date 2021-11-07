import { IsNotEmpty, IsInt, IsDate, IsNotIn } from 'class-validator';
import { isDate } from 'moment';

export class AddMembersToProjectDto {  
  @IsNotEmpty()
  id: number
  @IsNotEmpty()
  members: number[]
}
