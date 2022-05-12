import { BaseModel } from './base.model';
import LeaveModel from './leave.model';
export declare class LeaveTypeModel extends BaseModel {
    static tableName: string;
    name: string;
    fund: number;
    days: number;
    hours: number;
    durationType: string;
    urgent: boolean;
    brandCode: string;
    leaves: LeaveModel[];
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
