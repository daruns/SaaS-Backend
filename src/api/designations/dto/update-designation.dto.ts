import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsNotIn } from 'class-validator';

export class UpdateDesignationDto {
  @IsInt()
  id: number
  name: string
  departmentId: number
}
