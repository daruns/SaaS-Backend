import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(req: any): Promise<import("./users.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./users.service").ResponseData>;
    create(user: CreateUserDto): Promise<import("./users.service").ResponseData>;
    update(user: any): Promise<import("./users.service").ResponseData>;
    delete(user: any): Promise<import("./users.service").ResponseData>;
}
