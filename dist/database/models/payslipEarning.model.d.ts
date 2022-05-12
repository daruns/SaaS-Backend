import { BaseModel } from './base.model';
import { PayslipModel } from './payslip.model';
export declare class PayslipEarningModel extends BaseModel {
    static tableName: string;
    name: string;
    amount: number;
    payslipId: number;
    brandCode: string;
    payslip: PayslipModel;
    static relationMappings: {
        payslip: {
            modelClass: string;
            relation: import("objection").RelationType;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
export default PayslipEarningModel;
