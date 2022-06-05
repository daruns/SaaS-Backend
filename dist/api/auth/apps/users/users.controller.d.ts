/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    allWithBrand(req: any): Promise<import("./users.service").ResponseData>;
    allWithBrandClients(req: any): Promise<import("./users.service").ResponseData>;
    allWithBrandNoClients(req: any): Promise<import("./users.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./users.service").ResponseData>;
    create(user: CreateUserDto, file: Express.Multer.File, req: any): Promise<import("./users.service").ResponseData>;
    update(user: UpdateUserDto, file: Express.Multer.File, req: any): Promise<import("./users.service").ResponseData>;
    delete(user: any, req: any): Promise<import("./users.service").ResponseData>;
}
