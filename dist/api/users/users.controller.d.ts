import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./users.service").ResponseData>;
    findOne(id: number): Promise<import("./users.service").ResponseData>;
    create(user: CreateUserDto): Promise<{
        success: boolean;
        message: string;
        data: import("../../database/models/user.model").UserModel;
    } | {
        success: boolean;
        message: string;
        data: {};
    }>;
    update(user: any): Promise<{
        success: boolean;
        message: string;
        data: number;
    } | {
        success: boolean;
        message: string;
        data: {};
    }>;
    delete(user: {
        id: number;
    }): Promise<{
        success: boolean;
        message: string;
        data: number;
    } | {
        success: boolean;
        message: string;
        data: {};
    }>;
}
