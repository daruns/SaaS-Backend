export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class AppService {
    getHello(): Promise<ResponseData>;
}
