import { ClientModel } from 'src/database/models/client.model';
import { ModelClass } from 'objection';
import { UsersService } from 'src/api/auth/apps/users/users.service';
import { FileUploadService, ResponseData } from 'src/app/app.service';
import { CreateClientUserDto } from './dto/create-client-user.dto';
import { UserModel } from 'src/database/models/user.model';
import { UpdateClientUserDto } from './dto/update-client-user.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientDto } from './dto/create-client.dto';
export declare class ClientsService {
    private modelClass;
    private userClass;
    private readonly usersService;
    private readonly fileUploadService;
    constructor(modelClass: ModelClass<ClientModel>, userClass: ModelClass<UserModel>, usersService: UsersService, fileUploadService: FileUploadService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateClientDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateClientDto, currentUser: any): Promise<ResponseData>;
    deleteById(payload: {
        id: number;
    }, currentUser: any): Promise<ResponseData>;
    addUser(payload: CreateClientUserDto, currentUser: any): Promise<ResponseData>;
    editUser(payload: UpdateClientUserDto, currentUser: any): Promise<ResponseData>;
    removeUser(payload: {
        id: number;
        userId: number;
    }, currentUser: any): Promise<ResponseData>;
}
