/// <reference types="multer" />
/// <reference types="node" />
import { AttachmentModel } from 'src/database/models/attachment.model';
import { ModelClass } from 'objection';
export declare const imageFileFilter: (req: any, file: any, callback: any) => any;
export declare const ToExstName: (filename: any) => string;
export declare const SkipEmpty: (target: any, key: string) => void;
export declare const editFileName: (req: any, file: any, callback: any) => void;
export declare const documentFileFilter: (req: any, file: any, callback: any) => void;
export declare class PhoneNumberRegex {
    static reg: RegExp;
}
export declare class linkAddressRegex {
    static reg: RegExp;
}
export declare class AddFileDto {
    id: number;
    files: Array<Express.Multer.File>;
}
export interface FileParamDto {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare const ToPhone: (target: any, key: string) => void;
export declare const ToLower: (target: any, key: string) => void;
export declare const DefaultToFalse: (target: any, key: string) => void;
export declare const ToRate: (target: any, key: string) => void;
export declare class AppService {
    getHello(): Promise<ResponseData>;
}
export declare class FileUploadService {
    private attachmentModel;
    constructor(attachmentModel: ModelClass<AttachmentModel>);
    addFile(file: FileParamDto, folder: string, currentUser: any): Promise<ResponseData>;
    removeFile(id: number, currentUser: any): Promise<ResponseData>;
}
