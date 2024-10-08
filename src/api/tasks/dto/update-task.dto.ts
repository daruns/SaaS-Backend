import { IsNotEmpty, MinLength, MaxLength, IsInt, IsString, Matches, IsEmail, IsOptional, IsIn, IsDecimal, IsNotIn } from 'class-validator';
import { PhoneNumberRegex } from 'src/app/app.service'

export class UpdateTaskDto {
  @IsNotEmpty()
  id: number
  name: string
  description: string
  priority: string
  actualStartDate: Date
  actualdEndDate: Date
  plannedStartDate: Date
  plannedEndDate: Date
  boardId: number
  status: string
  deleted: number
  @IsNotEmpty()
  members: number[]
}

export class ChangeBoardDto {
  @IsInt()
  @IsNotEmpty()
  id: number
  @IsInt()
  @IsNotEmpty()
  boardId: number
}