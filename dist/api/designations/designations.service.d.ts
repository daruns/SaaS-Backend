import { DesignationModel } from 'src/database/models/designation.model';
import { DepartmentModel } from 'src/database/models/department.model';
import { ModelClass } from 'objection';
import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class DesignationsService {
    private modelClass;
    private departmentClass;
    constructor(modelClass: ModelClass<DesignationModel>, departmentClass: ModelClass<DepartmentModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateDesignationDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateDesignationDto, currentUser: any): Promise<ResponseData>;
    deleteById(designationId: number, currentUser: any): Promise<ResponseData>;
}
