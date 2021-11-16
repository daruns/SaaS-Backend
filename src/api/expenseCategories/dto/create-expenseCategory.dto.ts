import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class CreateExpenseCategoryDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  description: string
}
