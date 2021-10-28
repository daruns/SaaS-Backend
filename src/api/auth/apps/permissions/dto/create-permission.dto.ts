import { IsNotEmpty, IsInt } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'subject is required' })
  subject: string
  @IsNotEmpty({ message: 'action is required' })
  action: string
  @IsNotEmpty({ message: 'resource is required' })
  resource: string
  @IsNotEmpty()
  @IsInt()
  weight: number
  userId: number
  roleId: number
}
