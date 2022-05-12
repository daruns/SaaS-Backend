import { DeductionTypeModel } from 'src/database/models/deductionType.model';
import { ModelClass } from 'objection';
import { CreateDeductionTypeDto } from './dto/create-deductionType.dto';
import { UpdateDeductionTypeDto } from './dto/update-deductionType.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class DeductionTypesService {
    private modelClass;
    constructor(modelClass: ModelClass<DeductionTypeModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateDeductionTypeDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateDeductionTypeDto, currentUser: any): Promise<ResponseData>;
    deleteById(deductionTypeId: number, currentUser: any): Promise<ResponseData>;
}
