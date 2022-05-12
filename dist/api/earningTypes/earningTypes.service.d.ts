import { EarningTypeModel } from 'src/database/models/earningType.model';
import { ModelClass } from 'objection';
import { CreateEarningTypeDto } from './dto/create-earningType.dto';
import { UpdateEarningTypeDto } from './dto/update-earningType.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class EarningTypesService {
    private modelClass;
    constructor(modelClass: ModelClass<EarningTypeModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateEarningTypeDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateEarningTypeDto, currentUser: any): Promise<ResponseData>;
    deleteById(earningTypeId: number, currentUser: any): Promise<ResponseData>;
}
