import { MessageModel } from 'src/database/models/message.model';
import { ModelClass } from 'objection';
import { FileParamDto, FileUploadService } from 'src/app/app.service';
import { RemoveFilesDto } from './dto/remove-MessageAttachments.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class ChatsService {
    private modelClass;
    private readonly fileUploadService;
    constructor(modelClass: ModelClass<MessageModel>, fileUploadService: FileUploadService);
    removeFiles(payload: RemoveFilesDto, currentUser: any): Promise<ResponseData>;
    addFiles(payload: FileParamDto[], currentUser: any): Promise<ResponseData>;
}
