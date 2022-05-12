import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';
import { DefaultToNow } from 'src/app/app.service';

export class CreateOvertimeDto {
  name: string
  description: string
  @DefaultToNow
  @IsNotEmpty()
  from: Date
  @IsNotEmpty()
  overtimeTypeId: number
  readonly currentBalance: number
  readonly remainBalance: number
  @DefaultToNow
  @IsNotEmpty()
  to: Date
  employeeId: number
}
