import { UpdateSubServiceItemDto } from './dto/update-subServiceItem.dto';
import { SubServiceItemsService } from './subServiceItems.service';
import { CreateSubServiceItemDto } from './dto/create-subServiceItem.dto';
export declare class SubServiceItemsController {
    private readonly subServiceItemsService;
    constructor(subServiceItemsService: SubServiceItemsService);
    findAll(req: any): Promise<import("./subServiceItems.service").ResponseData>;
    findOne(id: number, req: any): Promise<import("./subServiceItems.service").ResponseData>;
    create(subServiceItem: CreateSubServiceItemDto, req: any): Promise<import("./subServiceItems.service").ResponseData>;
    update(payload: UpdateSubServiceItemDto, req: any): Promise<import("./subServiceItems.service").ResponseData>;
    deleteById(payload: any, req: any): Promise<import("./subServiceItems.service").ResponseData>;
}
