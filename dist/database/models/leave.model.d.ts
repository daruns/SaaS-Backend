import { BaseModel } from './base.model';
import { EmployeeModel } from './employee.model';
import LeaveTypeModel from './leaveType.model';
import LeaveApprovalModel from './leaveApproval.model';
export declare class LeaveModel extends BaseModel {
    static tableName: string;
    name: string;
    description: string;
    from: Date;
    to: Date;
    currentBalance: number;
    remainBalance: number;
    employeeId: number;
    leaveTypeId: number;
    employee: EmployeeModel;
    leaveType: LeaveTypeModel;
    leaveApprovals: LeaveApprovalModel[];
    static relationMappings: {
        employee: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        leaveType: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        leaveApprovals: {
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
