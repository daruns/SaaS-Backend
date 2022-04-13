import { BaseModel } from './base.model';
import { EmployeeModel } from './employee.model';
import { LeaveModel } from './leave.model';
export declare class LeaveApprovalModel extends BaseModel {
    static tableName: string;
    leaveId: number;
    managerId: number;
    brandCode: string;
    manager: EmployeeModel;
    leave: LeaveModel;
    static relationMappings: {
        leave: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        manager: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default LeaveApprovalModel;
