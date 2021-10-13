import { UserModel } from 'src/database/models/user.model';
import { ModelClass } from 'objection';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class UsersService {
    private modelClass;
    constructor(modelClass: ModelClass<UserModel>);
    findAll(): Promise<ResponseData>;
    findById(id: number): Promise<ResponseData>;
    findByUsername(username: string): Promise<ResponseData>;
    create(payload: any): Promise<{
        success: boolean;
        message: string;
        data: UserModel;
    } | {
        success: boolean;
        message: string;
        data: {};
    }>;
    update(payload: any): Promise<{
        success: boolean;
        message: string;
        data: number;
    } | {
        success: boolean;
        message: string;
        data: {};
    }>;
    delete(payload: any): Promise<{
        success: boolean;
        message: string;
        data: number;
    } | {
        success: boolean;
        message: string;
        data: {};
    }>;
}
