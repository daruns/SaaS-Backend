import { SocialMediaStudioUserDto } from './socialMediaStudioUser.dto';
export declare class CreateSocialMediaStudioDto {
    name: string;
    plannedStartDate: Date;
    plannedEndDate: Date;
    schedule: Date;
    mineApproved: boolean;
    clientApproval: boolean;
    stage: string;
    priority: string;
    description: string;
    clientId: number;
    users: SocialMediaStudioUserDto[];
}
