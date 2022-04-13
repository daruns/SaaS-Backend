import { UpdateTaxDto } from './dto/update-tax.dto';
import { TaxesService } from './taxes.service';
import { CreateTaxDto } from './dto/create-tax.dto';
export declare class TaxesController {
    private readonly taxesService;
    constructor(taxesService: TaxesService);
    findAll(req: any): Promise<import("./taxes.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./taxes.service").ResponseData>;
    create(tax: CreateTaxDto, req: any): Promise<import("./taxes.service").ResponseData>;
    update(payload: UpdateTaxDto, req: any): Promise<import("./taxes.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./taxes.service").ResponseData>;
}
