import { ChatsService } from './chats.service';
import { FileParamDto } from 'src/app/app.service';
import { RemoveFilesDto } from './dto/remove-MessageAttachments.dto';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    addFiles(files: FileParamDto[], req: any): Promise<import("./chats.service").ResponseData>;
    removeFiles(payload: RemoveFilesDto, req: any): Promise<import("./chats.service").ResponseData>;
}
