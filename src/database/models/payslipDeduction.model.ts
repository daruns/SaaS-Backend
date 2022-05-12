import { BaseModel } from './base.model';
import { Model } from 'objection';
import { PayslipModel } from './payslip.model';

const tableName = 'payslipDeductions'
export class PayslipDeductionModel extends BaseModel {
  static tableName = tableName;
  name: string
  amount: number
  payslipId: number
  brandCode: string

  payslip: PayslipModel;

  static relationMappings = {
    // list of all payslip on current payslip
    payslip: {
      modelClass: `${__dirname}/payslip.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.payslipId`,
        to: 'payslips.id',
      },
    },
  };
}

export default PayslipDeductionModel
