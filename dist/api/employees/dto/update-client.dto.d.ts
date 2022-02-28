import { FileParamDto } from 'src/app/app.service';
import { CreateClientUserDto } from './create-client-user.dto';
export declare class UpdateClientDto {
    id: number | string;
    name: string;
    logo: FileParamDto;
    phoneNumbers: string;
    clientType: string;
    businessType: string;
    website: string;
    address: string;
    rate: number;
    zipCode: string;
    status: string;
    user: CreateClientUserDto;
}
