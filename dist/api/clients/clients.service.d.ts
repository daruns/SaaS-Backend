import { ClientModel } from 'src/database/models/client.model';
import { ModelClass } from 'objection';
import { UsersService } from '../users/users.service';
import { ResponseData } from 'src/app/app.service';
import { UserModel } from 'src/database/models/user.model';
export declare class ClientsService {
    private modelClass;
    private userClass;
    private readonly usersService;
    constructor(modelClass: ModelClass<ClientModel>, userClass: ModelClass<UserModel>, usersService: UsersService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: any, user: any, currentUser: any): Promise<ResponseData>;
    update(payload: any, currentUser: any): Promise<ResponseData>;
    deleteById(payload: {
        id: number;
    }, currentUser: any): Promise<ResponseData>;
    getUserById(id: number): Promise<any>;
}
