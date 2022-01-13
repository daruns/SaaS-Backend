import { FileParamDto } from 'src/app/app.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { CreateSocialMediaStudioDto } from './dto/create-socialMediaStudio.dto';
import { UpdateSocialMediaStudioDto } from './dto/update-socialMediaStudio.dto';
import { SocialMediaStudiosService } from './socialMediaStudios.service';
export declare class SocialMediaStudiosController {
    private readonly socialMediaStudiosService;
    constructor(socialMediaStudiosService: SocialMediaStudiosService);
    findAll(req: any): Promise<import("../../app/app.service").ResponseData>;
    drafts(req: any): Promise<import("../../app/app.service").ResponseData>;
    inProductions(req: any): Promise<import("../../app/app.service").ResponseData>;
    inReviews(req: any): Promise<import("../../app/app.service").ResponseData>;
    Completeds(req: any): Promise<import("../../app/app.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("../../app/app.service").ResponseData>;
    addMediaToSMS(files: Array<FileParamDto>, media: CreateMediaDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    create(socialMedia: CreateSocialMediaStudioDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    update(payload: UpdateSocialMediaStudioDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("../../app/app.service").ResponseData>;
}
