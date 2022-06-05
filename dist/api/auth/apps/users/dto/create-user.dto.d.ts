import { FileParamDto } from 'src/app/app.service';
export declare class CreateUserDto {
    name: string;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
    userType: string;
    avatar: string | FileParamDto;
    department: string;
    reportsTo: string;
    brandCode: string;
    permissions: Array<{
        subjects: string[];
        all: boolean;
        read: boolean;
        create: boolean;
        update: boolean;
        delete: boolean;
    }>;
}
export declare type PermissionType = Array<{
    subjects: string[];
    all: boolean;
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
}>;
