import { IsNotEmpty, IsInt, IsDate, IsNotIn } from 'class-validator';
import { isDate } from 'moment';

export class AddLeadersToProjectDto {  
  @IsNotEmpty()
  id: number
  @IsNotEmpty()
  leaders: number[]
}
