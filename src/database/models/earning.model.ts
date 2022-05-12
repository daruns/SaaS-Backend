import { BaseModel } from './base.model';
import { Model } from 'objection';
import EmployeeModel from './employee.model';
import EarningTypeModel from './earningType.model';

const tableName = 'earnings';
export class EarningModel extends BaseModel {
  static tableName = tableName;
  description: string
  qty: number
  total: number
  date: Date
  employeeId: number
  earningTypeId: number
  brandCode: string

  employee: EmployeeModel;
  earningType: EarningTypeModel;

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
    earningType: {
      modelClass: `${__dirname}/earningType.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${tableName}.earningTypeId`,
        to: 'earningTypes.id',
      },
    },
  };
}

export default EarningModel
