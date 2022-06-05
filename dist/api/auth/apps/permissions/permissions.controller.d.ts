import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    findAll(req: any): Promise<import("./permissions.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./permissions.service").ResponseData>;
    create(payload: CreatePermissionDto, req: any): Promise<import("./permissions.service").ResponseData>;
    update(payload: UpdatePermissionDto, req: any): Promise<import("./permissions.service").ResponseData>;
    delete(payload: any, req: any): Promise<import("./permissions.service").ResponseData>;
}
