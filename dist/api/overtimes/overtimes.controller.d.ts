import { UpdateApprovalDto, UpdateOvertimeDto } from './dto/update-overtime.dto';
import { OvertimesService } from './overtimes.service';
import { CreateOvertimeDto } from './dto/create-overtime.dto';
export declare class OvertimesController {
    private readonly overtimesService;
    constructor(overtimesService: OvertimesService);
    findAll(req: any): Promise<import("./overtimes.service").ResponseData>;
    findApprovals(req: any): Promise<import("./overtimes.service").ResponseData>;
    findMyOvertimes(req: any): Promise<import("./overtimes.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./overtimes.service").ResponseData>;
    create(overtime: CreateOvertimeDto, req: any): Promise<import("./overtimes.service").ResponseData>;
    updateApproval(payload: UpdateApprovalDto, req: any): Promise<import("./overtimes.service").ResponseData>;
    approveOvertime(payload: UpdateApprovalDto, req: any): Promise<import("./overtimes.service").ResponseData>;
    update(payload: UpdateOvertimeDto, req: any): Promise<import("./overtimes.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./overtimes.service").ResponseData>;
}
