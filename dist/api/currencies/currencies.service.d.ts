import { InventoryItemModel } from 'src/database/models/inventoryItem.model';
import { ModelClass } from 'objection';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class CurrenciesService {
    private modelClass;
    constructor(modelClass: ModelClass<InventoryItemModel>);
    findAll(currentUser: any): Promise<ResponseData>;
}
