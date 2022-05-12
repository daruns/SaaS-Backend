import { BaseModel } from './base.model';
import { EmployeeModel } from './employee.model';
import OvertimeTypeModel from './overtimeType.model';
import OvertimeApprovalModel from './overtimeApproval.model';
export declare class OvertimeModel extends BaseModel {
    static tableName: string;
    name: string;
    description: string;
    from: Date;
    to: Date;
    currentBalance: number;
    remainBalance: number;
    employeeId: number;
    overtimeTypeId: number;
    employee: EmployeeModel;
    overtimeType: OvertimeTypeModel;
    overtimeApprovals: OvertimeApprovalModel[];
    static relationMappings: {
        employee: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        overtimeType: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        overtimeApprovals: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default OvertimeModel;
