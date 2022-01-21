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
    activationToken: string;
    activationTokenExpire: Date;
    activatedAt: Date;
    passwordResetToken: string;
    passwordResetTokenExpire: Date;
    lastResetAt: Date;
    brandCode: string;
}
