import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    findAll(req: any): Promise<import("./suppliers.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./suppliers.service").ResponseData>;
    create(supplier: CreateSupplierDto, req: any): Promise<import("./suppliers.service").ResponseData>;
    update(payload: UpdateSupplierDto, req: any): Promise<import("./suppliers.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./suppliers.service").ResponseData>;
}
