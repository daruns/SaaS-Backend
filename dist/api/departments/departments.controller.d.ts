import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    findAll(req: any): Promise<import("./departments.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./departments.service").ResponseData>;
    create(department: CreateDepartmentDto, req: any): Promise<import("./departments.service").ResponseData>;
    update(payload: UpdateDepartmentDto, req: any): Promise<import("./departments.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./departments.service").ResponseData>;
}
