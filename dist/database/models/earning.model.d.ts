import { BaseModel } from './base.model';
import EmployeeModel from './employee.model';
import EarningTypeModel from './earningType.model';
export declare class EarningModel extends BaseModel {
    static tableName: string;
    description: string;
    qty: number;
    total: number;
    date: Date;
    employeeId: number;
    earningTypeId: number;
    brandCode: string;
    employee: EmployeeModel;
    earningType: EarningTypeModel;
    static relationMappings: {
        employee: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        earningType: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default EarningModel;
