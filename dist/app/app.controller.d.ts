import { AppService, FileUploadService, ResponseData } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly fileUploadService;
    constructor(appService: AppService, fileUploadService: FileUploadService);
    getCurrencyCodes(req: any): Promise<ResponseData>;
    getHello(req: any): Promise<string>;
}
