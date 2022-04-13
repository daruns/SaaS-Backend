import { FileParamDto } from 'src/app/app.service';
export declare class CreateClientDto {
    name: string;
    logo: FileParamDto;
    departmentId: number;
    designationId: number;
    managerId: number;
    userId: number;
    avatar: string | FileParamDto;
    username: string;
    zipCode: string;
    address: string;
    email: string;
    password: string;
    readonly userType: string;
    phoneNumber: string;
    createdBy: string;
    avatar: string;
    reportsTo: string;
    brandCode: string;
    status: string;
}
