import { OvertimeTypeModel } from 'src/database/models/overtimeType.model';
import { ModelClass } from 'objection';
import { CreateOvertimeTypeDto } from './dto/create-overtimeType.dto';
import { UpdateOvertimeTypeDto } from './dto/update-overtimeType.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class OvertimeTypesService {
    private modelClass;
    constructor(modelClass: ModelClass<OvertimeTypeModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateOvertimeTypeDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateOvertimeTypeDto, currentUser: any): Promise<ResponseData>;
    deleteById(overtimeTypeId: number, currentUser: any): Promise<ResponseData>;
}
