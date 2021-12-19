import { BrandModel } from 'src/database/models/brand.model';
import { ModelClass } from 'objection';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class BrandsService {
    private modelClass;
    constructor(modelClass: ModelClass<BrandModel>);
    findAll(): Promise<ResponseData>;
    findById(id: number): Promise<ResponseData>;
    findByBrandCode(brandCode: string): Promise<ResponseData>;
    create(payload: any): Promise<ResponseData>;
    update(payload: any): Promise<ResponseData>;
    delete(payload: any): Promise<ResponseData>;
}
