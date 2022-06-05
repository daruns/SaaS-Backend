import { IsNotEmpty, MinLength, MaxLength, IsIn } from 'class-validator';
import { SubjectsDto } from 'src/api/auth/can/enums/subjects.enum';
import { ActionsDto } from 'src/api/auth/can/enums/actions.enum';

export class CanActivateDto {
  @IsNotEmpty({ message: 'subject is required' })
  @IsIn(SubjectsDto)
  subject: string
  @IsNotEmpty({ message: 'action is required' })
  @IsIn(ActionsDto)
  action: string
}
