import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  description: string
  status: string
  @IsNotEmpty()
  @IsInt()
  projectId: number
}
