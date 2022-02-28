import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class CreateDesignationDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  @IsNotEmpty()
  departmentId: number
}
