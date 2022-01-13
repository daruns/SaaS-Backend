import { SocialMediaStudioModel } from 'src/database/models/socialMediaStudio.model';
import { ModelClass } from 'objection';
import { ClientsService } from 'src/api/clients/clients.service';
import { CreateSocialMediaStudioDto } from './dto/create-socialMediaStudio.dto';
import UserModel from 'src/database/models/user.model';
import { AddFileDto, FileUploadService, ResponseData } from 'src/app/app.service';
import { UpdateSocialMediaStudioDto } from './dto/update-socialMediaStudio.dto';
import SocialMediaStudioUserModel from 'src/database/models/socialMediaStudioUser.model';
import MediaModel from 'src/database/models/media.model';
import { UpdateMediaDto } from './dto/update-media.dto';
import { CreateMediaDto } from './dto/create-media.dto';
import MediaAttachmentModel from 'src/database/models/mediaAttachment.model';
export declare class SocialMediaStudiosService {
    private modelClass;
    private socialMediaStudioUserModel;
    private mediaModel;
    private mediaAttachmentModel;
    private userModel;
    private clientSerive;
    private readonly fileUploadService;
    constructor(modelClass: ModelClass<SocialMediaStudioModel>, socialMediaStudioUserModel: ModelClass<SocialMediaStudioUserModel>, mediaModel: ModelClass<MediaModel>, mediaAttachmentModel: ModelClass<MediaAttachmentModel>, userModel: ModelClass<UserModel>, clientSerive: ClientsService, fileUploadService: FileUploadService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    findByStage(stage: string, currentUser: any): Promise<ResponseData>;
    create(payload: CreateSocialMediaStudioDto, currentUser: any): Promise<ResponseData>;
    approve(id: number, currentUser: any): Promise<ResponseData>;
    updateMedia(payload: UpdateMediaDto, currentUser: any): Promise<ResponseData>;
    addFile(payload: AddFileDto, currentUser: any): Promise<ResponseData>;
    removeFile(payload: {
        id: number;
        attachId: number;
    }, currentUser: any): Promise<ResponseData>;
    createMedia(payload: CreateMediaDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateSocialMediaStudioDto, currentUser: any): Promise<ResponseData>;
    deleteById(socialMediaStudioId: number, currentUser: any): Promise<ResponseData>;
    deleteMediaById(mediaId: number, currentUser: any): Promise<ResponseData>;
}
