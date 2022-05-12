import { BaseModel } from './base.model';
import { Model } from 'objection';
import { EmployeeModel } from './employee.model';
import PayslipDeductionModel from './payslipDeduction.model';
import PayslipEarningModel from './payslipEarning.model';

const tableName = 'payslips'
export class PayslipModel extends BaseModel {
  static tableName = tableName;
  basicSalary: number
  netSalary: number
  fromDate: Date
  toDate: Date
  employeeId: number

  employee: EmployeeModel;
  payslipDeductions: PayslipDeductionModel[];
  payslipEarnings: PayslipEarningModel[];

  static relationMappings = {
    // list of all employee on current employee
    employee: {
      modelClass: `${__dirname}/employee.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.employeeId`,
        to: 'employees.id',
      },
    },
    // list of all payslipEarnings on current payslipEarnings
    payslipEarnings: {
      modelClass: `${__dirname}/payslipEarning.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'payslipEarnings.payslipId',
      },
    },
    // list of all payslipDeductions on current payslipDeductions
    payslipDeductions: {
      modelClass: `${__dirname}/payslipDeduction.model`,
      relation: Model.HasManyRelation,
      join: {
        from: `${tableName}.id`,
        to: 'payslipDeductions.payslipId',
      },
    },
  };
}

export default PayslipModel
