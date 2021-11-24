import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateExpenseSubCategoryDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  description: string
  @IsInt()
  @IsNotEmpty()
  expenseCategoryId: number
}
