import { SubServiceItemModel } from 'src/database/models/subServiceItem.model';
import { ModelClass } from 'objection';
import { ServiceItemsService } from '../serviceItems/serviceItems.service';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class SubServiceItemsService {
    private modelClass;
    private serviceItemService;
    constructor(modelClass: ModelClass<SubServiceItemModel>, serviceItemService: ServiceItemsService);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: any, currentUser: any): Promise<ResponseData>;
    update(payload: any, currentUser: any): Promise<ResponseData>;
    deleteById(subServiceItemId: number, currentUser: any): Promise<ResponseData>;
}
