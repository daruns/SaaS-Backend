import { UpdateEarningTypeDto } from './dto/update-earningType.dto';
import { EarningTypesService } from './earningTypes.service';
import { CreateEarningTypeDto } from './dto/create-earningType.dto';
export declare class EarningTypesController {
    private readonly earningTypesService;
    constructor(earningTypesService: EarningTypesService);
    findAll(req: any): Promise<import("./earningTypes.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./earningTypes.service").ResponseData>;
    create(earningType: CreateEarningTypeDto, req: any): Promise<import("./earningTypes.service").ResponseData>;
    update(payload: UpdateEarningTypeDto, req: any): Promise<import("./earningTypes.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./earningTypes.service").ResponseData>;
}
