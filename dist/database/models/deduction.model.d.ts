import { BaseModel } from './base.model';
import EmployeeModel from './employee.model';
import DeductionTypeModel from './deductionType.model';
export declare class DeductionModel extends BaseModel {
    static tableName: string;
    description: string;
    qty: number;
    total: number;
    date: Date;
    employeeId: number;
    deductionTypeId: number;
    brandCode: string;
    employee: EmployeeModel;
    deductionType: DeductionTypeModel;
    static relationMappings: {
        employee: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        deductionType: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default DeductionModel;
