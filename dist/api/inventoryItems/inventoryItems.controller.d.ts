import { UpdateInventoryItemDto } from './dto/update-inventoryItem.dto';
import { InventoryItemsService } from './inventoryItems.service';
import { CreateInventoryItemDto } from './dto/create-inventoryItem.dto';
export declare class InventoryItemsController {
    private readonly inventoryItemsService;
    constructor(inventoryItemsService: InventoryItemsService);
    findAll(req: any): Promise<import("./inventoryItems.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./inventoryItems.service").ResponseData>;
    create(inventoryItem: CreateInventoryItemDto, req: any): Promise<import("./inventoryItems.service").ResponseData>;
    update(payload: UpdateInventoryItemDto, req: any): Promise<import("./inventoryItems.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./inventoryItems.service").ResponseData>;
}
