import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateExpenseChildSubCategoryDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  description: string
  @IsInt()
  @IsNotEmpty()
  expenseSubCategoryId: number
}
