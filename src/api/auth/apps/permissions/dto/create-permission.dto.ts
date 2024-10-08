import { IsNotEmpty, IsInt, IsIn } from 'class-validator';
import { ActionsDto } from 'src/api/auth/can/enums/actions.enum';
import { SubjectsDto } from 'src/api/auth/can/enums/subjects.enum';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'subject is required' })
  @IsIn(SubjectsDto)
  subject: string
  @IsNotEmpty({ message: 'action is required' })
  @IsIn(ActionsDto)
  action: string
  @IsNotEmpty()
  @IsInt()
  userId: number
}
