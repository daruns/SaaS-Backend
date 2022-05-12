import { UpdateDeductionDto } from './dto/update-deduction.dto';
import { DeductionsService } from './deductions.service';
import { CreateDeductionDto } from './dto/create-deduction.dto';
export declare class DeductionsController {
    private readonly deductionsService;
    constructor(deductionsService: DeductionsService);
    findAll(req: any): Promise<import("../../app/app.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("../../app/app.service").ResponseData>;
    create(deduction: CreateDeductionDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    update(payload: UpdateDeductionDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("../../app/app.service").ResponseData>;
}
