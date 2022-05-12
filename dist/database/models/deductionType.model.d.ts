import { BaseModel } from './base.model';
export declare class DeductionTypeModel extends BaseModel {
    static tableName: string;
    name: string;
    type: string;
    fund: number;
    rate: number;
    durationType: string;
    brandCode: string;
    static relationMappings: {
        deductions: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default DeductionTypeModel;
