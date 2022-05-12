import { IsNotEmpty, IsInt, IsOptional, IsNotIn, IsIn } from 'class-validator';

export class CreateEarningTypeDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string
  type: string
  fund: number
  rate: number
  @IsIn(['days','weeks','months'])
  durationType: string
  brandCode: string
}
