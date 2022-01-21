import { SocialMediaStudioUserDto } from './socialMediaStudioUser.dto';
export declare class UpdateSocialMediaStudioDto {
    id: number;
    name: string;
    status: string;
    stage: string;
    plannedStartDate: Date;
    plannedEndDate: Date;
    schedule: Date;
    clientApproval: boolean;
    priority: string;
    description: string;
    clientId: number;
    users: SocialMediaStudioUserDto[];
}
