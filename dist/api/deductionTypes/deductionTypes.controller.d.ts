import { UpdateDeductionTypeDto } from './dto/update-deductionType.dto';
import { DeductionTypesService } from './deductionTypes.service';
import { CreateDeductionTypeDto } from './dto/create-deductionType.dto';
export declare class DeductionTypesController {
    private readonly deductionTypesService;
    constructor(deductionTypesService: DeductionTypesService);
    findAll(req: any): Promise<import("./deductionTypes.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./deductionTypes.service").ResponseData>;
    create(deductionType: CreateDeductionTypeDto, req: any): Promise<import("./deductionTypes.service").ResponseData>;
    update(payload: UpdateDeductionTypeDto, req: any): Promise<import("./deductionTypes.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./deductionTypes.service").ResponseData>;
}
