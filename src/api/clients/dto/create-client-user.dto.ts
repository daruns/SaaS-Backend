import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateClientUserDto {
    // @IsNotEmpty({ message: 'Email is required' })
    // @IsEmail({}, { message: 'Email address is invalid' })
    // email: string;
  
    // @MinLength(3, { message: 'username must more than 3 chars' })
    // @MaxLength(30, { message: 'username is too long. only 30 chars allowed.' })
    // @IsOptional()
    username: string
  
    // @IsNotEmpty({ message: 'Password is required' })
    // @MinLength(7, { message: 'Password must have 8 chars' })
    // @MaxLength(30, { message: 'Password is too long. only 30 chars allow.' })
    // @IsOptional()
    password: string;
  }
