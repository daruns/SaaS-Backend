import { NonInventoryItemModel } from 'src/database/models/nonInventoryItem.model';
import { ModelClass } from 'objection';
export interface ResponseData {
    readonly success: boolean;
    readonly message: string;
    readonly data: any;
}
export declare class NonInventoryItemsService {
    private modelClass;
    constructor(modelClass: ModelClass<NonInventoryItemModel>);
    findAll(currentUser: any): Promise<ResponseData>;
    findById(id: number, currentUser: any): Promise<ResponseData>;
    create(payload: any, currentUser: any): Promise<ResponseData>;
    update(payload: any, currentUser: any): Promise<ResponseData>;
    deleteById(nonInventoryItemId: number, currentUser: any): Promise<ResponseData>;
}
