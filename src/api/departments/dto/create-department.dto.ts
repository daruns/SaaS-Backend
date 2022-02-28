import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
}
