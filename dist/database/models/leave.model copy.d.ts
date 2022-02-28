import { BaseModel } from './base.model';
import { EmployeeModel } from './employee.model';
export declare class LeaveModel extends BaseModel {
    static tableName: string;
    name: string;
    description: string;
    from: Date;
    to: Date;
    currentBalance: number;
    remainBalance: number;
    employeeId: number;
    employee: EmployeeModel;
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
export default LeaveModel;
