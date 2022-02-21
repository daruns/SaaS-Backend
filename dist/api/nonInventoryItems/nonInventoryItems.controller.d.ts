import { UpdateNonInventoryItemDto } from './dto/update-nonInventoryItem.dto';
import { NonInventoryItemsService } from './nonInventoryItems.service';
import { CreateNonInventoryItemDto } from './dto/create-nonInventoryItem.dto';
export declare class NonInventoryItemsController {
    private readonly nonInventoryItemsService;
    constructor(nonInventoryItemsService: NonInventoryItemsService);
    findAll(req: any): Promise<import("./nonInventoryItems.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./nonInventoryItems.service").ResponseData>;
    create(nonInventoryItem: CreateNonInventoryItemDto, req: any): Promise<import("./nonInventoryItems.service").ResponseData>;
    update(payload: UpdateNonInventoryItemDto, req: any): Promise<import("./nonInventoryItems.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./nonInventoryItems.service").ResponseData>;
}
