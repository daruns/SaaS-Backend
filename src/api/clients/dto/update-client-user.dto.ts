import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsOptional, IsString, IsInt } from 'class-validator';
import { ToPhone } from 'src/app/app.service';

export class UpdateClientUserDto {
  @IsNotEmpty()
  @IsInt()
  id: number
  name: string
  @IsOptional()
  @MinLength(8, { message: 'Password must have 8 chars' })
  @MaxLength(30, { message: 'Password is too long. only 30 chars allow.' })
  password: string;
  updatedBy: string
  reportsTo: string
  status: string
}
