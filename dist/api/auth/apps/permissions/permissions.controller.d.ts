import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
export declare class PermissionsController {
    private readonly usersService;
    constructor(usersService: PermissionsService);
    findAll(req: any): Promise<import("./permissions.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./permissions.service").ResponseData>;
    create(user: CreatePermissionDto): Promise<import("./permissions.service").ResponseData>;
    update(user: any): Promise<import("./permissions.service").ResponseData>;
    delete(user: any): Promise<import("./permissions.service").ResponseData>;
}
