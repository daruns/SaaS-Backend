import { ClientModel } from 'src/database/models/client.model';
import { ModelClass } from 'objection';
import { UsersService } from '../users/users.service';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class ClientsService {
    private modelClass;
    private readonly usersService;
    constructor(modelClass: ModelClass<ClientModel>, usersService: UsersService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: any, user: any, currentUser: any): Promise<ResponseData>;
    update(payload: any, currentUser: any): Promise<ResponseData>;
    deleteById(clientId: number, currentUser: any): Promise<ResponseData>;
}
