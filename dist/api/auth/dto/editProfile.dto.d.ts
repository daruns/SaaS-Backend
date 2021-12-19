import { FileParamDto } from 'src/app/app.service';
export declare class EditProfileDto {
    password: string;
    phoneNumber: string;
    avatar: string | FileParamDto;
    name: string;
}
