import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  // @IsNotEmpty({ message: 'userId is required' })
  userId: number;
}
