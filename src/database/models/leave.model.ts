import { BaseModel } from './base.model';
import { Model } from 'objection';
import { EmployeeModel } from './employee.model';

const tableName = 'leaves'
export class LeaveModel extends BaseModel {
  static tableName = tableName;
  name: string
  description: string
  from: Date
  to: Date
  currentBalance: number
  remainBalance: number
  employeeId: number

  employee: EmployeeModel;

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
  };
}

export default LeaveModel
