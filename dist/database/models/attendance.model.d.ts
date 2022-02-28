import { BaseModel } from './base.model';
export declare class AttendanceModel extends BaseModel {
    static tableName: string;
    checkedIn: boolean;
    employeeId: number;
    brandCode: string;
}
export default AttendanceModel;
