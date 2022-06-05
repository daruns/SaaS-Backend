import { IsOptional, IsNotEmpty, IsInt } from 'class-validator';

export class UpdatePermissionDto {
  @IsInt()
  @IsNotEmpty({ message: 'id is required' })
  id: number
  subject: string
  action: string
  @IsInt()
  @IsOptional()
  userId: number
}
