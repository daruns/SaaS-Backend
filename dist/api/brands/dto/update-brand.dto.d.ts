import { FileParamDto } from 'src/app/app.service';
export declare class UpdateBrandDto {
    id: number;
    name: string;
    logo: string | FileParamDto;
    companySize: number;
    address: string;
    announcedAt: Date;
    branches: string;
    occupation: string;
    website: string;
    phoneNumber: string;
    email: string;
}
