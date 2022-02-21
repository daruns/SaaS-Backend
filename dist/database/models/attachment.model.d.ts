import { BaseModel } from './base.model';
export declare class AttachmentModel extends BaseModel {
    static tableName: string;
    name: string;
    description: string;
    key: string;
    url: string;
    contentType: string;
    size: number;
    brandCode: string;
    static relationMappings: {};
}
export default AttachmentModel;
