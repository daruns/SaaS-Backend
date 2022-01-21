import { FileParamDto } from 'src/app/app.service';
export declare class CreateClientDto {
    name: string;
    logo: FileParamDto;
    phoneNumbers: string;
    clientType: string;
    businessType: string;
    email: string;
    website: string;
    address: string;
    rate: number;
    zipCode: string;
    status: string;
}
