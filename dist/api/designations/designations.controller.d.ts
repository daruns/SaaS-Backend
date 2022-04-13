import { UpdateDesignationDto } from './dto/update-designation.dto';
import { DesignationsService } from './designations.service';
import { CreateDesignationDto } from './dto/create-designation.dto';
export declare class DesignationsController {
    private readonly designationsService;
    constructor(designationsService: DesignationsService);
    findAll(req: any): Promise<import("./designations.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./designations.service").ResponseData>;
    create(designation: CreateDesignationDto, req: any): Promise<import("./designations.service").ResponseData>;
    update(payload: UpdateDesignationDto, req: any): Promise<import("./designations.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./designations.service").ResponseData>;
}
