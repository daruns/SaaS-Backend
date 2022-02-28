import { BaseModel } from './base.model';
export declare class LeaveTypeModel extends BaseModel {
    static tableName: string;
    name: string;
    maxDays: number;
    days: number;
    brandCode: string;
}
export default LeaveTypeModel;
