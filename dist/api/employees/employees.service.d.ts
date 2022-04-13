import { EmployeeModel } from 'src/database/models/employee.model';
import { ModelClass } from 'objection';
import { UsersService } from 'src/api/auth/apps/users/users.service';
import { FileUploadService, ResponseData } from 'src/app/app.service';
import { UserModel } from 'src/database/models/user.model';
import { DesignationModel } from 'src/database/models/designation.model';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
export declare class EmployeesService {
    private modelClass;
    private userClass;
    private designationClass;
    private readonly usersService;
    private readonly fileUploadService;
    constructor(modelClass: ModelClass<EmployeeModel>, userClass: ModelClass<UserModel>, designationClass: ModelClass<DesignationModel>, usersService: UsersService, fileUploadService: FileUploadService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    findMe(currentUser: any): Promise<ResponseData>;
    createHr(payload: CreateEmployeeDto, currentUser: any): Promise<ResponseData>;
    create(payload: CreateEmployeeDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateEmployeeDto, currentUser: any): Promise<ResponseData>;
    deleteById(payload: {
        id: number;
    }, currentUser: any): Promise<ResponseData>;
    findByUSerId(id: number, currentUser: any): Promise<ResponseData>;
}
