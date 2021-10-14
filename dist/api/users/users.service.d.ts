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
    findByEmail(email: string): Promise<ResponseData>;
    create(payload: any): Promise<ResponseData>;
    update(payload: any): Promise<ResponseData>;
    delete(payload: any): Promise<ResponseData>;
}
