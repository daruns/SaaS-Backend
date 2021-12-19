import { InventoryItemModel } from 'src/database/models/inventoryItem.model';
import { ModelClass } from 'objection';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class InventoryItemsService {
    private modelClass;
    constructor(modelClass: ModelClass<InventoryItemModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: any, currentUser: any): Promise<ResponseData>;
    reduceItemQty(item: {
        qty: number;
        id: number;
    }, currentUser: any): Promise<ResponseData>;
    update(payload: any, currentUser: any): Promise<ResponseData>;
    deleteById(inventoryItemId: number, currentUser: any): Promise<ResponseData>;
}
