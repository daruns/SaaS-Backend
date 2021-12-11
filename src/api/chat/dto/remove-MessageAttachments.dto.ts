import { IsNotEmpty, IsInt, IsDate, IsNotIn } from 'class-validator';
import { isDate } from 'moment';

export class RemoveFilesDto {
  @IsNotEmpty()
  id: number
  @IsNotEmpty()
  attachmentIds: number[]
}