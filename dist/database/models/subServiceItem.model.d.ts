import { BaseModel } from './base.model';
import { ServiceItemModel } from './serviceItem.model';
export declare class SubServiceItemModel extends BaseModel {
    static tableName: string;
    name: string;
    description: string;
    unitPrice: number;
    qty: number;
    purchasedAt: Date;
    expireDate: Date;
    supplier: string;
    brandCode: string;
    serviceItemId: number;
    serviceItem: ServiceItemModel;
    static relationMappings: {
        serviceItem: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default SubServiceItemModel;
