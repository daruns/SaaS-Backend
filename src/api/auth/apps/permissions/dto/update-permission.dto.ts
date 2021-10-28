import { IsOptional, IsNotEmpty, IsInt } from 'class-validator';

export class UpdatePermissionDto {
  @IsInt()
  @IsNotEmpty({ message: 'id is required' })
  id: number
  subject: string
  action: string
  resource: string
  @IsInt()
  @IsOptional()
  weight: number
  @IsInt()
  @IsOptional()
  userId: number
  @IsInt()
  @IsOptional()
  roleId: number
  status: string
  @IsInt()
  @IsOptional()
  deleted: number
}
