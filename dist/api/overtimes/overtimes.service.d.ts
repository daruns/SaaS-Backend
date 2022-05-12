import { OvertimeModel } from 'src/database/models/overtime.model';
import { ModelClass } from 'objection';
import { CreateOvertimeDto } from './dto/create-overtime.dto';
import { UpdateApprovalDto, UpdateOvertimeDto } from './dto/update-overtime.dto';
import OvertimeApprovalModel from 'src/database/models/overtimeApproval.model';
import EmployeeModel from 'src/database/models/employee.model';
import { OvertimeTypeModel } from 'src/database/models/overtimeType.model';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class OvertimesService {
    private modelClass;
    private employeeClass;
    private overtimeTypeClass;
    private overtimeApprovalClass;
    constructor(modelClass: ModelClass<OvertimeModel>, employeeClass: ModelClass<EmployeeModel>, overtimeTypeClass: ModelClass<OvertimeTypeModel>, overtimeApprovalClass: ModelClass<OvertimeApprovalModel>);
    findMyOvertimes(currentUser: any): Promise<ResponseData>;
    findAllApprovals(currentUser: any): Promise<ResponseData>;
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    createOvertime(payload: CreateOvertimeDto, currentUser: any): Promise<ResponseData>;
    updateApproval(payload: UpdateApprovalDto, currentUser: any): Promise<ResponseData>;
    approveOvertime(payload: UpdateApprovalDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateOvertimeDto, currentUser: any): Promise<ResponseData>;
    deleteById(overtimeId: number, currentUser: any): Promise<ResponseData>;
    getManagersOvertimeApproval(employeeProfile: any, addedOvertime: any, currentUser: any, firstManager: any): Promise<any[]>;
}
