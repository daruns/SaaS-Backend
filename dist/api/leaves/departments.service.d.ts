import { DepartmentModel } from 'src/database/models/department.model';
import { ModelClass } from 'objection';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class DepartmentsService {
    private modelClass;
    constructor(modelClass: ModelClass<DepartmentModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateDepartmentDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateDepartmentDto, currentUser: any): Promise<ResponseData>;
    deleteById(departmentId: number, currentUser: any): Promise<ResponseData>;
}
