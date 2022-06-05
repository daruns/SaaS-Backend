import { AppService, FileUploadService, ResponseData } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly fileUploadService;
    constructor(appService: AppService, fileUploadService: FileUploadService);
    getCurrencyCodes(req: any): Promise<ResponseData>;
    getFile(query: {
        key: string;
    }, res: any): Promise<void>;
}
