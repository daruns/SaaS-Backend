import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn } from 'class-validator';

export class UpdateExpenseSubCategoryDto {
  @IsInt()
  id: number
  name: string
  description: string
}
