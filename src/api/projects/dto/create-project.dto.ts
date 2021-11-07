import { IsNotEmpty, IsInt, IsDate, IsNotIn } from 'class-validator';
import { isDate } from 'moment';

export class CreateProjectDto {  
  @IsNotEmpty()
  name: string
  // brandCode: string
  @IsNotEmpty()
  plannedStartDate: Date
  @IsNotEmpty()
  plannedEndDate: Date
  actualStartDate: Date
  actualdEndDate: Date
  rate: number
  status: string
  rateType: string
  priority: string
  description: string
  // attachments: 
  @IsNotEmpty()
  clientId: number
  @IsNotEmpty()
  leaders: number[]
  @IsNotEmpty()
  members: number[]
}

