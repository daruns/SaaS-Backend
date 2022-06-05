import { PermissionModel } from 'src/database/models/permission.model';
import { UserModel } from 'src/database/models/user.model';
import { ModelClass } from 'objection';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class PermissionsService {
    private modelClass;
    private userModel;
    constructor(modelClass: ModelClass<PermissionModel>, userModel: ModelClass<UserModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    findByUser(userId: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreatePermissionDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdatePermissionDto, currentUser: any): Promise<ResponseData>;
    delete(payload: any, currentUser: any): Promise<ResponseData>;
}
