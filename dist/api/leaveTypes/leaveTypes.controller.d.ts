import { UpdateLeaveTypeDto } from './dto/update-leaveType.dto';
import { LeaveTypesService } from './leaveTypes.service';
import { CreateLeaveTypeDto } from './dto/create-leaveType.dto';
export declare class LeaveTypesController {
    private readonly leaveTypesService;
    constructor(leaveTypesService: LeaveTypesService);
    findAll(req: any): Promise<import("./leaveTypes.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./leaveTypes.service").ResponseData>;
    create(leaveType: CreateLeaveTypeDto, req: any): Promise<import("./leaveTypes.service").ResponseData>;
    update(payload: UpdateLeaveTypeDto, req: any): Promise<import("./leaveTypes.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./leaveTypes.service").ResponseData>;
}
