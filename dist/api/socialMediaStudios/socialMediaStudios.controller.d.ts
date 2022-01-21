import { FileParamDto } from 'src/app/app.service';
import { AddSocialMediaUsersDto } from './dto/add-socialMediaUsers.dto';
import { CreateMediaDto } from './dto/create-media.dto';
import { CreateSocialMediaStudioDto } from './dto/create-socialMediaStudio.dto';
import { RemoveMediaAttachmentDto } from './dto/remove-mediaAttachment.dto';
import { RemoveSocialMediaStudioUsersDto } from './dto/remove-socialMediaStudioUsers.dto';
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
    createMedia(attachments: Array<FileParamDto>, media: CreateMediaDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    create(socialMedia: CreateSocialMediaStudioDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    addUsers(payload: AddSocialMediaUsersDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    removeUsers(payload: RemoveSocialMediaStudioUsersDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    addAttachments(id: number, files: any, req: any): Promise<import("../../app/app.service").ResponseData>;
    removeAttachment(payload: RemoveMediaAttachmentDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    approve(payload: {
        id: number;
    }, req: any): Promise<import("../../app/app.service").ResponseData>;
    update(payload: UpdateSocialMediaStudioDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("../../app/app.service").ResponseData>;
}
