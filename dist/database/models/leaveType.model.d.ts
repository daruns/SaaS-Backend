import { BaseModel } from './base.model';
export declare class LeaveTypeModel extends BaseModel {
    static tableName: string;
    name: string;
    fund: number;
    days: number;
    urgent: boolean;
    brandCode: string;
    static relationMappings: {
        leaves: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default LeaveTypeModel;
