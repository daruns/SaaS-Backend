import { BrandModel } from 'src/database/models/brand.model';
import { ModelClass } from 'objection';
import { FileUploadService } from 'src/app/app.service';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class BrandsService {
    private modelClass;
    private fileUploadService;
    constructor(modelClass: ModelClass<BrandModel>, fileUploadService: FileUploadService);
    findAll(): Promise<ResponseData>;
    findById(id: number): Promise<ResponseData>;
    findByBrandCode(brandCode: string): Promise<ResponseData>;
    create(payload: any): Promise<ResponseData>;
    update(payload: any, currentUser: any): Promise<ResponseData>;
    delete(payload: any): Promise<ResponseData>;
}
