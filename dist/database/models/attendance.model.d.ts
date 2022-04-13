import { BaseModel } from './base.model';
export declare class AttendanceModel extends BaseModel {
    static tableName: string;
    checkedIn: boolean;
    employeeId: number;
    brandCode: string;
    static relationMappings: {
        employee: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default AttendanceModel;
