import { AttendanceModel } from 'src/database/models/attendance.model';
import { ModelClass } from 'objection';
import { EmployeeModel } from 'src/database/models/employee.model';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class AttendancesService {
    private modelClass;
    private employeeClass;
    constructor(modelClass: ModelClass<AttendanceModel>, employeeClass: ModelClass<EmployeeModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findAllByUser(currentUser: any): Promise<ResponseData>;
    create(currentUser: any): Promise<ResponseData>;
    parseTable(data: any): any[];
}
