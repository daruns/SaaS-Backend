import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import DesignationModel from './designation.model';
import { DeviceModel } from 'aws-sdk/clients/workmail';
export declare class EmployeeModel extends BaseModel {
    static tableName: string;
    name: string;
    managerId: number;
    userId: number;
    hr: boolean;
    designationId: number;
    leaveBalance: number;
    salary: number;
    brandCode: string;
    user: UserModel;
    designation: DesignationModel;
    department: DeviceModel;
    manager: EmployeeModel;
    static relationMappings: {
        user: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        designation: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        department: {
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
export default EmployeeModel;
