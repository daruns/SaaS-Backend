import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    findAll(req: any): Promise<import("./roles.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./roles.service").ResponseData>;
    create(role: CreateRoleDto): Promise<import("./roles.service").ResponseData>;
    update(role: any): Promise<import("./roles.service").ResponseData>;
    delete(role: any): Promise<import("./roles.service").ResponseData>;
}
