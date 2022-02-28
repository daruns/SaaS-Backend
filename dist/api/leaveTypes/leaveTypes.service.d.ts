import { LeaveTypeModel } from 'src/database/models/leaveType.model';
import { ModelClass } from 'objection';
import { CreateLeaveTypeDto } from './dto/create-leaveType.dto';
import { UpdateLeaveTypeDto } from './dto/update-leaveType.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class LeaveTypesService {
    private modelClass;
    constructor(modelClass: ModelClass<LeaveTypeModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateLeaveTypeDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateLeaveTypeDto, currentUser: any): Promise<ResponseData>;
    deleteById(leaveTypeId: number, currentUser: any): Promise<ResponseData>;
}
