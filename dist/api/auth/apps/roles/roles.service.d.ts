import { RoleModel } from 'src/database/models/role.model';
import { ModelClass } from 'objection';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class RolesService {
    private modelClass;
    constructor(modelClass: ModelClass<RoleModel>);
    findAll(): Promise<ResponseData>;
    findById(id: number): Promise<ResponseData>;
    findByRolename(rolename: string): Promise<ResponseData>;
    create(payload: any): Promise<ResponseData>;
    update(payload: any): Promise<ResponseData>;
    delete(payload: any): Promise<ResponseData>;
}
