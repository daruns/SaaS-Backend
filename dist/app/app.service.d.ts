export declare class PhoneNumberRegex {
    static reg: RegExp;
}
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare const ToPhone: (target: any, key: string) => void;
export declare class AppService {
    getHello(): Promise<ResponseData>;
}
