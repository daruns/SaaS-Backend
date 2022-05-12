import { BaseModel } from './base.model';
import OvertimeModel from './overtime.model';
export declare class OvertimeTypeModel extends BaseModel {
    static tableName: string;
    name: string;
    fund: number;
    days: number;
    hours: number;
    durationType: string;
    urgent: boolean;
    brandCode: string;
    overtimes: OvertimeModel[];
    static relationMappings: {
        overtimes: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default OvertimeTypeModel;
