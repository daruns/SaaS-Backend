import { UpdateEarningDto } from './dto/update-earning.dto';
import { EarningsService } from './earnings.service';
import { CreateEarningDto } from './dto/create-earning.dto';
export declare class EarningsController {
    private readonly earningsService;
    constructor(earningsService: EarningsService);
    findAll(req: any): Promise<import("../../app/app.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("../../app/app.service").ResponseData>;
    create(earning: CreateEarningDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    update(payload: UpdateEarningDto, req: any): Promise<import("../../app/app.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("../../app/app.service").ResponseData>;
}
