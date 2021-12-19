import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    findAll(req: any): Promise<import("./brands.service").ResponseData>;
    findByBrandCode(brandCode: string, req: any): Promise<import("./brands.service").ResponseData>;
    create(brand: CreateBrandDto): Promise<import("./brands.service").ResponseData>;
}
