import { IsNotEmpty, IsInt, IsOptional, IsNotIn } from 'class-validator';

export class CreateTaxDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsNotEmpty()
  name: string
  type: string
  @IsNotIn([0])
  @IsNotEmpty()
  rate: number
  description: string
}
