/// <reference types="multer" />
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { FileParamDto } from "src/app/app.service";
import { UsersService } from '../auth/apps/users/users.service';
export declare class EmployeesController {
    private readonly employeesService;
    private readonly usersService;
    constructor(employeesService: EmployeesService, usersService: UsersService);
    findAll(req: any): Promise<import("../../app/app.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("../../app/app.service").ResponseData>;
    create(payload: CreateEmployeeDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    update(payload: UpdateEmployeeDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    editProfile(payload: {
        id: number;
        avatar: string | FileParamDto;
    }, file: Express.Multer.File, req: any): Promise<import("../auth/apps/users/users.service").ResponseData>;
    deleteById(payload: {
        id: number;
    }, req: any): Promise<import("../../app/app.service").ResponseData>;
}
