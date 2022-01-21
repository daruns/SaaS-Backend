import { AppService, FileUploadService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly fileUploadService;
    constructor(appService: AppService, fileUploadService: FileUploadService);
    getHello(req: any): Promise<string>;
}
