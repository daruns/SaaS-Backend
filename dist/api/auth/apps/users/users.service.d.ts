import { UserModel } from 'src/database/models/user.model';
import { ModelClass } from 'objection';
import { BrandsService } from 'src/api/brands/brands.service';
import { FileUploadService } from "src/app/app.service";
import PermissionModel from 'src/database/models/permission.model';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class UsersService {
    private modelClass;
    private permissionClass;
    private brandService;
    private fileUploadService;
    constructor(modelClass: ModelClass<UserModel>, permissionClass: ModelClass<PermissionModel>, brandService: BrandsService, fileUploadService: FileUploadService);
    allWithBrand(currentUser: any): Promise<ResponseData>;
    allWithBrandClients(currentUser: any): Promise<ResponseData>;
    allWithBrandNoClients(currentUser: any): Promise<ResponseData>;
    findAll(): Promise<ResponseData>;
    findById(id: number): Promise<ResponseData>;
    findByUsername(username: string): Promise<ResponseData>;
    findByEmail(email: string): Promise<ResponseData>;
    create(payload: any, currentUser?: any): Promise<ResponseData>;
    update(payload: any, currentUser: any): Promise<ResponseData>;
    delete(payload: any, currentUser: any): Promise<ResponseData>;
}
