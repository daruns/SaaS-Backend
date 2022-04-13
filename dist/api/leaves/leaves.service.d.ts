import { LeaveModel } from 'src/database/models/leave.model';
import { ModelClass } from 'objection';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateApprovalDto, UpdateLeaveDto } from './dto/update-leave.dto';
import LeaveApprovalModel from 'src/database/models/leaveApproval.model';
import EmployeeModel from 'src/database/models/employee.model';
import { LeaveTypeModel } from 'src/database/models/leaveType.model';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class LeavesService {
    private modelClass;
    private employeeClass;
    private leaveTypeClass;
    private leaveApprovalClass;
    constructor(modelClass: ModelClass<LeaveModel>, employeeClass: ModelClass<EmployeeModel>, leaveTypeClass: ModelClass<LeaveTypeModel>, leaveApprovalClass: ModelClass<LeaveApprovalModel>);
    findMyLeaves(currentUser: any): Promise<ResponseData>;
    findAllApprovals(currentUser: any): Promise<ResponseData>;
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    createLeave(payload: CreateLeaveDto, currentUser: any): Promise<ResponseData>;
    updateApproval(payload: UpdateApprovalDto, currentUser: any): Promise<ResponseData>;
    approveLeave(payload: UpdateApprovalDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateLeaveDto, currentUser: any): Promise<ResponseData>;
    deleteById(leaveId: number, currentUser: any): Promise<ResponseData>;
    getManagersLeaveApproval(employeeProfile: any, addedLeave: any, currentUser: any, firstManager: any): Promise<any[]>;
}
