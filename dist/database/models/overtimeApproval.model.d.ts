import { BaseModel } from './base.model';
import { EmployeeModel } from './employee.model';
import { OvertimeModel } from './overtime.model';
export declare class OvertimeApprovalModel extends BaseModel {
    static tableName: string;
    overtimeId: number;
    managerId: number;
    brandCode: string;
    manager: EmployeeModel;
    overtime: OvertimeModel;
    static relationMappings: {
        overtime: {
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
export default OvertimeApprovalModel;
