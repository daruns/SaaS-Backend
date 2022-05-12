import { PayslipsService } from './payslips.service';
import { CreatePayslipDto } from './dto/create-payslip.dto';
export declare class PayslipsController {
    private readonly payslipsService;
    constructor(payslipsService: PayslipsService);
    findAll(req: any): Promise<import("../../app/app.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("../../app/app.service").ResponseData>;
    create(payslip: CreatePayslipDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("../../app/app.service").ResponseData>;
}
