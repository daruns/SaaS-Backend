import { PermissionModel } from 'src/database/models/permission.model';
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
    constructor(modelClass: ModelClass<PermissionModel>);
    findAll(): Promise<ResponseData>;
    findById(id: number): Promise<ResponseData>;
    findByRoleId(roleId: number): Promise<ResponseData>;
    findByUser(userId: number): Promise<ResponseData>;
    create(payload: CreatePermissionDto): Promise<ResponseData>;
    update(payload: UpdatePermissionDto): Promise<ResponseData>;
    delete(payload: any): Promise<ResponseData>;
}
