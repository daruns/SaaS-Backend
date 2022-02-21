import { BaseModel } from './base.model';
import { SubServiceItemModel } from './subServiceItem.model';
export declare class ServiceItemModel extends BaseModel {
    static tableName: string;
    name: string;
    description: string;
    unitPrice: number;
    qty: number;
    purchasedAt: Date;
    expireDate: Date;
    supplier: string;
    brandCode: string;
    subServiceItems: SubServiceItemModel[];
    static relationMappings: {
        subServiceItems: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default ServiceItemModel;
