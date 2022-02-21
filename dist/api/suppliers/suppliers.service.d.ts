import { SupplierModel } from 'src/database/models/supplier.model';
import { ModelClass } from 'objection';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class SuppliersService {
    private modelClass;
    constructor(modelClass: ModelClass<SupplierModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: CreateSupplierDto, currentUser: any): Promise<ResponseData>;
    update(payload: UpdateSupplierDto, currentUser: any): Promise<ResponseData>;
    deleteById(supplierId: number, currentUser: any): Promise<ResponseData>;
}
