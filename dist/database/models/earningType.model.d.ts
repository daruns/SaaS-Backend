import { BaseModel } from './base.model';
export declare class EarningTypeModel extends BaseModel {
    static tableName: string;
    name: string;
    type: string;
    fund: number;
    rate: number;
    durationType: string;
    brandCode: string;
    static relationMappings: {
        earnings: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default EarningTypeModel;
