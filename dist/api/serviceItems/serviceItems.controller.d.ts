import { UpdateServiceItemDto } from './dto/update-serviceItem.dto';
import { ServiceItemsService } from './serviceItems.service';
import { CreateServiceItemDto } from './dto/create-serviceItem.dto';
export declare class ServiceItemsController {
    private readonly serviceItemsService;
    constructor(serviceItemsService: ServiceItemsService);
    findAll(req: any): Promise<import("./serviceItems.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./serviceItems.service").ResponseData>;
    create(serviceItem: CreateServiceItemDto, req: any): Promise<import("./serviceItems.service").ResponseData>;
    update(payload: UpdateServiceItemDto, req: any): Promise<import("./serviceItems.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./serviceItems.service").ResponseData>;
}
