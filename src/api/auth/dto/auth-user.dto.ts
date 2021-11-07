import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { QueryAuthUser } from './query-auth-user.dto';

export class AuthUserDto extends QueryAuthUser{
  @IsNotEmpty({ message: 'Username is required' })
  username: string
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must have 8 chars' })
  @MaxLength(30, { message: 'Password is too long. only 30 chars allow.' })
  password: string;
}
