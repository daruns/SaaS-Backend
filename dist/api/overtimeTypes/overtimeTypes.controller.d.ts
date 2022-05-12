import { UpdateOvertimeTypeDto } from './dto/update-overtimeType.dto';
import { OvertimeTypesService } from './overtimeTypes.service';
import { CreateOvertimeTypeDto } from './dto/create-overtimeType.dto';
export declare class OvertimeTypesController {
    private readonly overtimeTypesService;
    constructor(overtimeTypesService: OvertimeTypesService);
    findAll(req: any): Promise<import("./overtimeTypes.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./overtimeTypes.service").ResponseData>;
    create(overtimeType: CreateOvertimeTypeDto, req: any): Promise<import("./overtimeTypes.service").ResponseData>;
    update(payload: UpdateOvertimeTypeDto, req: any): Promise<import("./overtimeTypes.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./overtimeTypes.service").ResponseData>;
}
