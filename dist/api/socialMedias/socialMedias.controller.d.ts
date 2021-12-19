import { UpdateSocialMediaDto } from './dto/update-socialMedia.dto';
import { SocialMediasService } from './socialMedias.service';
import { CreateSocialMediaDto } from './dto/create-socialMedia.dto';
export declare class SocialMediasController {
    private readonly socialMediasService;
    constructor(socialMediasService: SocialMediasService);
    findAll(req: any): Promise<import("./socialMedias.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./socialMedias.service").ResponseData>;
    create(socialMedia: CreateSocialMediaDto, req: any): Promise<import("./socialMedias.service").ResponseData>;
    update(payload: UpdateSocialMediaDto, req: any): Promise<import("./socialMedias.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./socialMedias.service").ResponseData>;
}
