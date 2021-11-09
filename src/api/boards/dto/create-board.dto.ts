import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';
import { AddAttributeDto } from './add-attribute.dto';

export class CreateBoardDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  description: string
  status: string
  @IsNotEmpty({ message: 'Name is required' })
  color: string
  @IsNotEmpty({ message: 'position is required' })
  @IsInt()
  position: number

}
