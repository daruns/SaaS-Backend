import { FileParamDto } from 'src/app/app.service';
export declare class CreateMediaDto {
    name: string;
    title: string;
    caption: string;
    textOnDesign: string;
    plannedStartDate: Date;
    plannedEndDate: Date;
    priority: string;
    socialMediaStudioId: number;
    type: string;
    designSize: string;
    attachments: Array<FileParamDto>;
}
