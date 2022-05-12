import { BaseModel } from './base.model';
import { EmployeeModel } from './employee.model';
import PayslipDeductionModel from './payslipDeduction.model';
import PayslipEarningModel from './payslipEarning.model';
export declare class PayslipModel extends BaseModel {
    static tableName: string;
    basicSalary: number;
    netSalary: number;
    fromDate: Date;
    toDate: Date;
    employeeId: number;
    employee: EmployeeModel;
    payslipDeductions: PayslipDeductionModel[];
    payslipEarnings: PayslipEarningModel[];
    static relationMappings: {
        employee: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        payslipEarnings: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
        payslipDeductions: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default PayslipModel;
