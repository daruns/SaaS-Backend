import { BaseModel } from './base.model';
export declare class InventoryItemModel extends BaseModel {
    static tableName: string;
    name: string;
    description: string;
    unitPrice: number;
    qty: number;
    purchasedAt: Date;
    expireDate: Date;
    supplier: string;
    brandCode: string;
    static relationMappings: {};
}
export default InventoryItemModel;
