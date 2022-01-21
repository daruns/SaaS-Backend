import { TaxModel } from 'src/database/models/tax.model';
import { ModelClass } from 'objection';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class TaxesService {
    private modelClass;
    constructor(modelClass: ModelClass<TaxModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateTaxDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateTaxDto, currentUser: any): Promise<ResponseData>;
    deleteById(taxId: number, currentUser: any): Promise<ResponseData>;
}
