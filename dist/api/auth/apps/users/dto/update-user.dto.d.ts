import { FileParamDto } from 'src/app/app.service';
export declare class UpdateUserDto {
    id: number;
    name: string;
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
    userType: string;
    avatar: string | FileParamDto;
    userId: number;
    department: string;
    reportsTo: string;
    activationToken: string;
    activationTokenExpire: Date;
    activatedAt: Date;
    passwordResetToken: string;
    passwordResetTokenExpire: Date;
    lastResetAt: Date;
    brandCode: string;
    status: string;
    deleted: number;
    permissions: Array<{
        subjects: string[];
        all: boolean;
        read: boolean;
        create: boolean;
        update: boolean;
        delete: boolean;
    }>;
}
