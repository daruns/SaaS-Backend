import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class AddAttributeDto {
  @IsNotEmpty()
  @IsInt()
  boardId: number
  @IsNotEmpty({ message: 'Name is required' })
  color: string
  @IsNotEmpty({ message: 'position is required' })
  @IsInt()
  position: number
}
