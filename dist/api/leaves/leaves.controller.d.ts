import { UpdateApprovalDto, UpdateLeaveDto } from './dto/update-leave.dto';
import { LeavesService } from './leaves.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
export declare class LeavesController {
    private readonly leavesService;
    constructor(leavesService: LeavesService);
    findAll(req: any): Promise<import("./leaves.service").ResponseData>;
    findApprovals(req: any): Promise<import("./leaves.service").ResponseData>;
    findMyLeaves(req: any): Promise<import("./leaves.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./leaves.service").ResponseData>;
    create(leave: CreateLeaveDto, req: any): Promise<import("./leaves.service").ResponseData>;
    updateApproval(payload: UpdateApprovalDto, req: any): Promise<import("./leaves.service").ResponseData>;
    approveLeave(payload: UpdateApprovalDto, req: any): Promise<import("./leaves.service").ResponseData>;
    update(payload: UpdateLeaveDto, req: any): Promise<import("./leaves.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./leaves.service").ResponseData>;
}
