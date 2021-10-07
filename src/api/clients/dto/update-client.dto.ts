import { IsNotEmpty, MinLength, MaxLength, IsInt } from 'class-validator';

export class UpdateClientDto {
  @IsNotEmpty({ message: 'ClientId is required' })
  @IsInt({ message: 'Client id must be integer' })
  clientId: number;

  // @IsNotEmpty({ message: 'Title is required' })
  // @MinLength(5, { message: 'Title must have 6 chars' })
  // @MaxLength(40, { message: 'Title is too long. only 40 chars allow.' })
  name: string;
  phoneNumber:string
  businessPhoneNumber1:string
  businessPhoneNumber2:string
  email:string
  website:string
  address:string
  rate:number
  status:string
  description:string
  clientType:string
  businessType:string
  deleted:number
  createdBy:string
  updatedBy:string

}
