import { BaseModel } from './base.model';
import { Model } from 'objection';
import EmployeeModel from './employee.model';
import DeductionTypeModel from './deductionType.model';

const tableName = 'deductions';
export class DeductionModel extends BaseModel {
  static tableName = tableName;
  description: string
  qty: number
  total: number
  date: Date
  employeeId: number
  deductionTypeId: number
  brandCode: string

  employee: EmployeeModel;
  deductionType: DeductionTypeModel;

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
    deductionType: {
      modelClass: `${__dirname}/deductionType.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.deductionTypeId`,
        to: 'deductionTypes.id',
      },
    },
  };
}

export default DeductionModel
